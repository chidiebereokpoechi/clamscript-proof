import { StateManager } from '../StateManager'
import { SkipStatement } from '../types'
import { Skip } from '../util'

export function skipStatement(
  statement: SkipStatement,
  stateManager: StateManager,
  scope?: string
): void {
  throw new Skip()
}
