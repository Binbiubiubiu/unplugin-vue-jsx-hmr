import { createHash } from 'crypto'
import { createRequire } from 'module'
import semverMajor from 'semver/functions/major'
import type { VueVersion } from '../types'

export function hashsum(input: string): string {
  return createHash('sha256').update(input).digest('hex').substring(0, 8)
}

export function getVueVersion(from: string): VueVersion {
  const m = tryRequire('vue', from)

  const mod: any = m.default ?? m
  return semverMajor(mod.version) === 2 ? 2 : 3
}

const _require = createRequire(import.meta.url)
export function tryRequire(id: string, from?: string) {
  try {
    return _require(requireResolve(id, from))
  }
  catch (e) {}
}
export function requireResolve(id: string, from?: string) {
  const options = from ? { paths: [from] } : undefined
  return _require.resolve(id, options)
}

export function isTsx(id: string): boolean {
  const [filepath] = id.split('?')
  return id.endsWith('.tsx') || filepath.endsWith('.tsx')
}
