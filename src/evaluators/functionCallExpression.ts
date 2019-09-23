import { StateManager } from '../StateManager'
import { FunctionCallExpression } from '../types'
import { ClamFunction } from '../util'
import { evaluate } from './'

export function functionCallExpression(
  statement: FunctionCallExpression,
  stateManager: StateManager,
  scope?: string
): any {
  const func = stateManager.retrieve(statement.name) as ClamFunction

  if (!func) {
    throw new Error("Error: The function '" + statement.name + "' does not exist.")
  }

  stateManager.functionsStack.push(func)

  return func.call(
    statement.args.map(stmt => evaluate(stmt, stateManager, scope)),
    stateManager.createScope(scope)
  )
}
