import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import { createPluginContext, createTransformer, normalizeOptions } from './core'
import type { Options } from './types'

export default createUnplugin<Options | undefined, boolean>((options = {} as any, meta) => {
  normalizeOptions(options)
  const { include, exclude } = options
  const filter = createFilter(include, exclude)

  const ctx = createPluginContext(options, meta)
  if (meta.framework === 'webpack') {
    ctx.set_root(meta.webpack.compiler.context)
    ctx.set_hmr(!!process.env.WEBPACK_SERVE)
  }
  else if (meta.framework === 'esbuild') {
    ctx.set_root(meta.build?.initialOptions.absWorkingDir)
    ctx.set_hmr(!!meta.watchMode)
  }

  return {
    name: 'unplugin-vue-jsx-hmr',
    transformInclude(id) {
      return filter(id)
    },
    transform(code, id) {
      return createTransformer(ctx).transform(code, id)
    },
    rollup: {
      outputOptions(config) {
        ctx.set_root(config.dir)
        ctx.set_hmr(!!meta.watchMode)
      },
    },
    vite: {
      config(config) {
        return {
          // only apply esbuild to ts files
          // since we are handling jsx and tsx now
          esbuild: {
            include: /\.ts$/,
          },
          define: {
            __VUE_OPTIONS_API__: config.define?.__VUE_OPTIONS_API__ ?? true,
            __VUE_PROD_DEVTOOLS__:
              config.define?.__VUE_PROD_DEVTOOLS__ ?? false,
          },
        }
      },
      configResolved(config) {
        ctx.set_root(config.root)
        ctx.set_hmr(config.command === 'serve' && !config.isProduction)
      },
    },
  }
})
