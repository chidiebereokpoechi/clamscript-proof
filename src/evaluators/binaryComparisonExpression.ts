import { StateManager } from '../StateManager'
import { BinaryExpression } from '../types'
import { evaluate } from './'

export function binaryComparisonExpression(
  statement: BinaryExpression,
  stateManager: StateManager,
  scope?: string
): boolean {
  const left = evaluate(statement.left, stateManager, scope)
  const right = evaluate(statement.right, stateManager, scope)

  switch (statement.type) {
    case 'EQUAL_TO':
      return left === right
    case 'NOT_EQUAL_TO':
      return left !== right
    case 'LESS_THAN':
      return left < right
    case 'GREATER_THAN':
      return left > right
    case 'LESS_THAN_EQUAL_TO':
      return left <= right
    case 'GREATER_THAN_EQUAL_TO':
      return left >= right
  }
}
