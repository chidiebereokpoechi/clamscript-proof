import { StateManager } from '../StateManager'
import { LengthExpression } from '../types'
import { ClamArray, getType } from '../util'
import { evaluate } from './'

export function lengthExpression(
  statement: LengthExpression,
  stateManager: StateManager,
  scope?: string
): number {
  const expression = evaluate(statement.expression, stateManager, scope) as ClamArray

  if (getType(expression) !== 'array') {
    throw new Error('You can only get the length of a list.')
  }

  return expression.getLength()
}
