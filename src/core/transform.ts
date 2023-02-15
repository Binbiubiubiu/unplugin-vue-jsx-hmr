import type { PluginItem } from '@babel/core'
import { transformSync } from '@babel/core'
import type { TransformResult } from 'unplugin'
import type { PluginContext } from './context'
import { isTsx } from './utils'
import { Vue2HotApi } from './vue2'
import { Vue3HotApi } from './vue3'

export const createTransformer = (...args: ConstructorParameters<typeof Transformer>) => new Transformer(...args)

export class Transformer {
  hotApi: Vue2HotApi | Vue3HotApi
  constructor(private ctx: PluginContext) {
    const {
      userOptions: { version },
    } = this.ctx
    this.hotApi
      = version === 2 ? new Vue2HotApi(this.ctx) : new Vue3HotApi(this.ctx)
  }

  async transform(code: string, id: string): Promise<TransformResult> {
    const {
      userOptions: { plugins: babelPlugins = [], sourceMaps, vueBabel = {} },
      hmr,
    } = this.ctx
    const babelPresets: PluginItem[] = [['@vue/babel-preset-app', vueBabel]]
    if (isTsx(id)) {
      babelPresets.push([
        '@babel/preset-typescript',
        { isTSX: true, allExtensions: true },
      ])
    }
    const result = transformSync(code, {
      babelrc: false,
      ast: true,
      configFile: false,
      sourceFileName: id,
      filename: id,
      sourceMaps,
      presets: babelPresets,
      plugins: babelPlugins,
    })
    if (!result || !result.code)
      return null

    if (hmr)
      this.hotApi.inject(result, id)

    return {
      code: result.code,
      map: result.map,
    }
  }
}
