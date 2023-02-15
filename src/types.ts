import type { PluginItem, TransformOptions } from '@babel/core'
import type { VueJSXPluginOptions } from '@vue/babel-plugin-jsx'
import type { FilterPattern } from '@rollup/pluginutils'
import type { Options as BabelEnvOptions } from '../types/@babel/preset-env'
import type { VueJSXPresetOptions } from '../types/@vue/babel-preset-jsx'

export type VueVersion = 'auto' | 2 | 3

type VueBabelOptions<T extends VueVersion> = Partial<BabelEnvOptions & {
  polyfills: Array<string>
  jsx:
  | {
    auto: VueJSXPresetOptions & VueJSXPluginOptions
    2: VueJSXPresetOptions
    3: VueJSXPluginOptions
  }[T]
  | boolean
  entryFiles: string[]
}>

export type Options = Partial<{
  include: FilterPattern
  exclude: FilterPattern
  plugins: PluginItem[]
  sourceMaps: TransformOptions['sourceMaps']
}> & (
  | { version: 2; vueBabel?: VueBabelOptions<2> }
  | { version: 3; vueBabel?: VueBabelOptions<3> }
  | { version?: 'auto'; vueBabel?: VueBabelOptions<'auto'> }
)

