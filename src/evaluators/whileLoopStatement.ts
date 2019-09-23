import { StateManager } from '../StateManager'
import { WhileLoopStatement } from '../types'
import { Exit, Skip } from '../util'
import { evaluate } from './'

export function whileLoopStatement(
  statement: WhileLoopStatement,
  stateManager: StateManager,
  scope?: string
): any {
  const UPPER_LIMIT = 1024 * 1024 * 1024
  let i = 0

  while (i < UPPER_LIMIT) {
    i++
    try {
      if (Boolean(evaluate(statement.expression, stateManager, scope))) {
        evaluate(statement.body, stateManager, scope)
        continue
      } else {
        break
      }
    } catch (error) {
      if (error instanceof Exit) {
        break
      } else if (error instanceof Skip) {
        continue
      } else {
        throw error
      }
    }
  }
}
