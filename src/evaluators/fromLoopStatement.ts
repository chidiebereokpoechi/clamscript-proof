import { StateManager } from '../StateManager'
import { Empty, FromLoopStatement } from '../types'
import { empty, Exit, Skip } from '../util'
import { evaluate } from './'

export function fromLoopStatement(
  statement: FromLoopStatement,
  stateManager: StateManager,
  scope?: string
): Empty {
  const lower = evaluate(statement.lower, stateManager, scope)
  const upper = evaluate(statement.upper, stateManager, scope)

  if (!Number.isInteger(lower + upper)) {
    throw new Error('Error: Invalid Types')
  }

  if (upper <= lower) {
    throw new Error('Error: Invalid Range; Lower must be <= Upper.')
  }

  stateManager.assign(statement.counter, lower, scope)

  for (let i = lower; i <= upper; i++) {
    try {
      stateManager.assign(statement.counter, i, scope)
      evaluate(statement.body, stateManager, scope)
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

  return empty
}
