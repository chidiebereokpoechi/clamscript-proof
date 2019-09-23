import { StateManager } from '../StateManager'
import { AssignmentStatement } from '../types'
import { evaluate } from './'

export function assignmentStatement(
  statement: AssignmentStatement,
  stateManager: StateManager,
  scope?: string
): any {
  const value = evaluate(statement.expression, stateManager, scope)
  return stateManager.assign(statement.name, value, scope)
}
