export interface VueJSXPresetOptions {
  functional?: boolean
  injectH?: boolean
  vModel?: boolean
  vOn?: boolean
  compositionAPI?:
  | true
  | 'auto'
  | 'native'
  | 'plugin'
  | 'vue-demi'
  | false
  | { importSource: string }
}
