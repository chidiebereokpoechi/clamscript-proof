import { StateManager } from '../StateManager'
import { FunctionDefinitionStatement } from '../types'
import { ClamFunction, empty } from '../util'

export function functionDefinitionStatement(
  statement: FunctionDefinitionStatement,
  stateManager: StateManager,
  scope?: string
): any {
  if (scope !== 'main') {
    throw new Error('Error: Functions can only be defined in the global scope.')
  }

  if (stateManager.retrieve(statement.name) !== empty) {
    throw new Error("Error: The function '" + statement.name + "' already exists.")
  }

  const func = new ClamFunction(statement.args, statement.body, stateManager)

  stateManager.assign(statement.name, func)
  return
}
