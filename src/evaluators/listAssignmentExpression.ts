import { StateManager } from '../StateManager'
import { ListAssignmentExpression } from '../types'
import { ClamArray, getType } from '../util'
import { evaluate } from './'

export function listAssignmentExpression(
  statement: ListAssignmentExpression,
  stateManager: StateManager,
  scope?: string
): ClamArray {
  const list = evaluate(statement.list, stateManager, scope) as ClamArray
  const index = evaluate(statement.index, stateManager, scope)
  const value = evaluate(statement.value, stateManager, scope)

  if (!Number.isInteger(index)) {
    throw new Error('Error: Index must be a number.')
  }

  if (getType(list) !== 'array') {
    throw new Error('Error: Expression does not evaluate to an array.')
  }

  list.assign(index, value)
  return list
}
