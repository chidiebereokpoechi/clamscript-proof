import { StateManager } from '../StateManager'
import { Empty, ListAccessExpression } from '../types'
import { ClamArray, empty } from '../util'
import { evaluate } from './'

export function listAccessExpression(
  statement: ListAccessExpression,
  stateManager: StateManager,
  scope?: string
): any[] | string | boolean | number | Empty {
  const list = evaluate(statement.list, stateManager, scope) as ClamArray
  const index = evaluate(statement.index, stateManager, scope)

  if (!Number.isInteger(index)) {
    throw new Error('Error: Index must be a number')
  }

  if (index >= list.getLength) {
    return empty
  }

  return list.retrieve(index)
}
