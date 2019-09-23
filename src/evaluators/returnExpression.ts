import { StateManager } from '../StateManager'
import { RunExpression } from '../types'
import { ReturnCall } from '../util'
import { evaluate } from './'

export function returnExpression(
  statement: RunExpression,
  stateManager: StateManager,
  scope?: string
): any {
  if (stateManager.isFunctionScope(scope)) {
    const value = evaluate(statement.expression, stateManager, scope)
    throw new ReturnCall(value)
  }

  throw new Error('Error: Return expressions must exist only inside of function definitions.')
}
