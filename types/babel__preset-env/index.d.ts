// Options
import type { InputTargets } from 'types/babel__helper-compilation-targets'

// Use explicit modules to prevent typo errors.
type ModuleOption =
  | false
  | 'auto'
  | 'amd'
  | 'commonjs'
  | 'cjs'
  | 'systemjs'
  | 'umd'
type BuiltInsOption = false | 'entry' | 'usage'

type CorejsVersion = 2 | 3 | string

type CorejsOption =
  | false
  | CorejsVersion
  | {
    version: CorejsVersion
    proposals: boolean
  }

type PluginListItem = string | RegExp
type PluginListOption = Array<PluginListItem>

export interface Options {
  bugfixes: boolean
  configPath: string
  corejs: CorejsOption
  debug: boolean
  exclude: PluginListOption
  forceAllTransforms: boolean
  ignoreBrowserslistConfig: boolean
  include: PluginListOption
  loose: boolean
  modules: ModuleOption
  shippedProposals: boolean
  spec: boolean
  targets: {
    uglify?: boolean
    esmodules?: boolean
  } & InputTargets
  useBuiltIns: BuiltInsOption
  browserslistEnv: string
}
