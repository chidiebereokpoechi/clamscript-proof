import { StateManager } from '../StateManager'
import { RunExpression } from '../types'
import { run } from '../util'
import { evaluate } from './'

export function runExpression(
  statement: RunExpression,
  stateManager: StateManager,
  scope?: string
): string {
  return run(evaluate(statement.expression, stateManager, scope))
}
