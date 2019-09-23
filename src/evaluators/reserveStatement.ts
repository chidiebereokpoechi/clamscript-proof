import { StateManager } from '../StateManager'
import { ReserveStatement } from '../types'

export function reserveStatement(
  statement: ReserveStatement,
  stateManager: StateManager,
  scope?: string
): void {
  statement.variableNames.map((name: string) => {
    stateManager.reserve(name, scope)
  })
}
