import type { Options } from '../types'

export function normalizeOptions(options: Options): Options {
  return Object.assign(options, {
    include: /\.[jt]sx$/,
    version: 'auto',
  } as Options)
}
