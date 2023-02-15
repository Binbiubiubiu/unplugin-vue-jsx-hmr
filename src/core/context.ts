import type { UnpluginContextMeta } from 'unplugin'
import type { Options, VueVersion } from '../types'
import { getVueVersion, requireResolve } from './utils'

export const createPluginContext = (...args: ConstructorParameters<typeof PluginContext>) => new PluginContext(...args)

export class PluginContext {
  root = process.cwd()
  hmr = false

  constructor(public userOptions: Options, public meta: UnpluginContextMeta) {}
  set_root(path?: string): PluginContext {
    if (path)
      this.root = path

    const { version } = this.userOptions
    if (!version || version === 'auto' as VueVersion)
      this.userOptions.version = getVueVersion(this.root)

    return this
  }

  set_hmr(open: boolean): PluginContext {
    this.hmr = open
    return this
  }

  resolve(id: string): string {
    return requireResolve(id, this.root)
  }
}
