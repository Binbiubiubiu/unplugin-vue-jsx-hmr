// Targets, engine names defined in compat-tables
type Target =
  | 'node'
  | 'deno'
  | 'chrome'
  | 'opera'
  | 'edge'
  | 'firefox'
  | 'safari'
  | 'ie'
  | 'ios'
  | 'android'
  | 'electron'
  | 'samsung'

type Targets = {
  [target in Target]?: string;
}

type Browsers = string | ReadonlyArray<string>

export type InputTargets = {
  browsers?: Browsers
  // When `true`, this completely replaces the `browsers` option.
  // When `intersect`, this is intersected with the `browsers`
  // option (giving the higher browsers as the result).
  // TODO(Babel 8): Make `true` behave like `intersect` and
  // remove `intersect`.
  esmodules?: boolean | 'intersect'
} & Targets
