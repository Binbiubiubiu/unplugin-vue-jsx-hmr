import traverse from '@babel/traverse'
import * as t from '@babel/types'
import type { BabelFileResult } from '@babel/core'
import type { PluginContext } from './context'
import type { DeclaredComponent, HotApiInterface, HotComponent } from './types'
import { hashsum } from './utils'

export class Vue2HotApi implements HotApiInterface {
  constructor(private ctx: PluginContext) {}
  inject(result: BabelFileResult, id: string): BabelFileResult {
    const { meta } = this.ctx
    const declaredComponents: DeclaredComponent[] = []
    const hotComponents: HotComponent[] = []
    let hasDefault = false

    traverse(result.ast, {
      VariableDeclaration: {
        enter: (path) => {
          const { node } = path
          const names = this.parseComponentDecls(node)
          if (names.length)
            declaredComponents.push(...names)
        },
      },
      ExportNamedDeclaration: {
        enter: (path) => {
          const { node } = path
          if (t.isVariableDeclaration(node.declaration)) {
            hotComponents.push(
              ...this.parseComponentDecls(node.declaration).map(
                ({ name }) => ({
                  local: name,
                  exported: name,
                  id: hashsum(id + name),
                }),
              ),
            )
          }
          else if (node.specifiers.length) {
            for (const spec of node.specifiers) {
              if (
                t.isExportSpecifier(spec)
              && t.isIdentifier(spec.exported)
              ) {
                const matched = declaredComponents.find(
                  ({ name }) => name === spec.local.name,
                )
                if (matched) {
                  hotComponents.push({
                    local: spec.local.name,
                    exported: spec.exported.name,
                    id: hashsum(id + spec.exported.name),
                  })
                }
              }
            }
          }
        },
      },
      ExportDefaultDeclaration: {
        enter: (path) => {
          const { node } = path
          if (t.isIdentifier(node.declaration)) {
            const _name = node.declaration.name
            const matched = declaredComponents.find(
              ({ name }) => name === _name,
            )
            if (matched) {
              hotComponents.push({
                local: node.declaration.name,
                exported: 'default',
                id: hashsum(`${id}default`),
              })
            }
          }
          else if (this.isDefineComponentCall(node.declaration)) {
            hasDefault = true
            hotComponents.push({
              local: '__default__',
              exported: 'default',
              id: hashsum(`${id}default`),
            })
          }
        },
      },
    })

    if (hotComponents.length) {
      if (hasDefault) {
        result.code
        = `${result.code!.replace(
          /export default defineComponent/g,
          'const __default__ = defineComponent',
        )}\nexport default __default__;\n`
      }

      switch (meta.framework) {
        case 'webpack':
          result.code += `\n${this.templateWebpack(hotComponents)}`
          break
        case 'vite':
          result.code += `\n${this.templateVite(hotComponents)}`
          break
      }
    }

    return result
  }

  templateWebpack(hotComponents: HotComponent[]): string {
    let record = ''
    let reload = ''
    hotComponents.forEach(({ id, local }) => {
      record += `hotAPI.createRecord("${id}", ${local}.options);\n`
      reload
        += `if(${local}.options.functional){\n
            hotAPI.rerender("${id}", ${local}.options);\n
          }else{\n
            hotAPI.reload("${id}", ${local}.options);\n
          }\n`
    })
    return `\n/* hot reload */\n
      if (module.hot) {\n
        (function(){\n
          var hotAPI = require("${this.ctx.resolve('vue-hot-reload-api')}");\n
          hotAPI.install(require("vue"), false);\n
          if (!hotAPI.compatible) return;\n
          module.hot.accept();\n
          if (!module.hot.data) {\n
            ${record}
          } else {\n
            ${reload}
          }\n
        })()\n
      }\n
    `
  }

  templateVite(hotComponents: HotComponent[]): string {
    let record = ''
    let args = ''
    let reload = ''
    hotComponents.forEach(({ id, local, exported }) => {
      record += `hotAPI.createRecord('${id}', ${local});\n`
      args += `${exported}: __${exported},\n`
      reload += `if(${local}.options.functional){\n
        hotAPI.rerender("${id}", __${exported});\n
      }else{\n
        hotAPI.reload("${id}", __${exported});\n
      }\n`
    })
    return `\n/* hot reload */\n
      (function(){\n
        var hotAPI = require("${this.ctx.resolve('vue-hot-reload-api')}");\n
        hotAPI.install(require("vue"), false);\n
        if (!hotAPI.compatible) return;\n
        ${record}\n
        import.meta.hot.accept(({${args}}) => {\n
          ${reload}\n
        });\n
      })()\n
    `
  }

  parseComponentDecls(node: t.VariableDeclaration): DeclaredComponent[] {
    const names = []
    for (const decl of node.declarations) {
      if (t.isIdentifier(decl.id) && this.isDefineComponentCall(decl.init)) {
        names.push({
          name: decl.id.name,
        })
      }
    }
    return names
  }

  isDefineComponentCall(node?: t.Node | null): boolean {
    return !!(
      node
      && t.isLogicalExpression(node)
      && t.isCallExpression(node.left)
      && t.isIdentifier(node.left.callee)
      && node.left.callee.name === 'Component'
    )
  }
}
