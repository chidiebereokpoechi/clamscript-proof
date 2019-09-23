import { StateManager } from '../StateManager'
import { Empty, FreeStatement } from '../types'
import { empty } from '../util'

export function freeStatement(
  statement: FreeStatement,
  stateManager: StateManager,
  scope?: string
): Empty {
  stateManager.free(statement.name)
  return empty
}
