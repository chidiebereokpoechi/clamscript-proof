import { StateManager } from '../StateManager'
import { Empty, PrintStatement } from '../types'
import { empty } from '../util'
import { evaluate } from './'

export function printStatement(
  statement: PrintStatement,
  stateManager: StateManager,
  scope?: string
): Empty {
  console.log(String(evaluate(statement.expression, stateManager, scope)))
  return empty
}
