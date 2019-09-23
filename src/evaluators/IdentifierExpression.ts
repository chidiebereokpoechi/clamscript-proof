import { StateManager } from '../StateManager'
import { IdentifierExpression } from '../types'

export function identifierExpression(
  statement: IdentifierExpression,
  stateManager: StateManager,
  scope?: string
): any {
  return stateManager.retrieve(statement.name, scope)
}
