import { StateManager } from '../StateManager'
import { ListDefinitionExpression } from '../types'
import { ClamArray } from '../util/ClamArray'
import { evaluate } from './'

export function listDefinitionExpression(
  statement: ListDefinitionExpression,
  stateManager: StateManager,
  scope?: string
): ClamArray {
  return new ClamArray(
    statement.body
      ? statement.body.map((element: any) => evaluate(element, stateManager, scope))
      : []
  )
}
