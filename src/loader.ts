import type { LoaderDefinitionFunction } from 'webpack'
import { createPluginContext, createTransformer } from './core'
const loader: LoaderDefinitionFunction = function (code, map, meta) {
  const callback = this.async()
  const options = this.getOptions()
  const ctx = createPluginContext(options, { framework: 'webpack', webpack: { compiler: this._compiler! } })
  createTransformer(ctx).transform(code, this.resourcePath).then((result) => {
    result ??= { code: '', map: undefined }

    if (result == null)
      callback(null, code, map, meta)
    else if (typeof result !== 'string')
      callback(null, result?.code ?? code, result.map as any | undefined ?? map, meta)
    else
      callback(null, result, map, meta)
  })
}

export default loader

