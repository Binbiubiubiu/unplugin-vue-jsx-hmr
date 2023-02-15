import type { BabelFileResult } from '@babel/core'
import type t from '@babel/types'

export interface HotComponent {
  id: string
  local: string
  exported: string
}

export interface DeclaredComponent {
  name: string
}

export interface HotApiInterface {
  inject(result: BabelFileResult, id: string): BabelFileResult
  templateWebpack(hotComponents: HotComponent[]): string
  templateVite(hotComponents: HotComponent[]): string
  parseComponentDecls(node: t.VariableDeclaration): DeclaredComponent[]
  isDefineComponentCall(node?: t.Node | null): boolean
}

