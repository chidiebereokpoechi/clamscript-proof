import { StateManager } from '../StateManager'
import { BinaryExpression } from '../types'
import { getType } from '../util'
import { evaluate } from './'

export function binaryLogicExpression(
  statement: BinaryExpression,
  stateManager: StateManager,
  scope?: string
): boolean {
  let left = evaluate(statement.left, stateManager, scope)
  left = getType(left) === 'empty' ? false : Boolean(left)

  let right = evaluate(statement.left, stateManager, scope)
  right = getType(right) === 'empty' ? false : Boolean(right)

  switch (statement.type) {
    case 'AND':
      return left && right
    case 'OR':
      return left || right
  }
}
