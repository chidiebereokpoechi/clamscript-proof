import { StateManager } from '../StateManager'
import { ExitStatement } from '../types'
import { Exit } from '../util'

export function exitStatement(
  statement: ExitStatement,
  stateManager: StateManager,
  scope?: string
): void {
  throw new Exit()
}
