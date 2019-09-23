import { StateManager } from '../StateManager'
import { ConditionalStatement } from '../types'
import { evaluate } from './'

export function conditionalStatement(
  statement: ConditionalStatement,
  stateManager: StateManager,
  scope?: string
): void {
  if (evaluate(statement.expression, stateManager, scope)) {
    evaluate(statement.main, stateManager, scope)
  }

  if (statement.alt) {
    if (!evaluate(statement.expression, stateManager, scope)) {
      return evaluate(statement.alt, stateManager, scope)
    }
  }
}
