import { StateManager } from '../StateManager'
import { LiteralExpression } from '../types'

export function literalExpression(
  statement: LiteralExpression,
  stateManager: StateManager,
  scope?: string
): number | string | boolean {
  return statement.value
}
