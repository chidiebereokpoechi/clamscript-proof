import { StateManager } from '../StateManager'
import { empty } from '../util'
import { assignmentStatement } from './assignmentStatement'
import { binaryComparisonExpression } from './binaryComparisonExpression'
import { binaryLogicExpression } from './binaryLogicExpression'
import { conditionalStatement } from './conditionalStatement'
import { exitStatement } from './exitStatement'
import { freeStatement } from './freeStatement'
import { fromLoopStatement } from './fromLoopStatement'
import { functionCallExpression } from './functionCallExpression'
import { functionDefinitionStatement } from './functionDefinitionStatement'
import { identifierExpression } from './IdentifierExpression'
import { lengthExpression } from './lengthExpression'
import { listAccessExpression } from './listAccessExpression'
import { listAssignmentExpression } from './listAssignmentExpression'
import { listDefinitionExpression } from './listDefinitionExpression'
import { literalExpression } from './literalExpression'
import { printStatement } from './printStatement'
import { reserveStatement } from './reserveStatement'
import { returnExpression } from './returnExpression'
import { runExpression } from './runExpression'
import { skipStatement } from './skipStatement'
import { whileLoopStatement } from './whileLoopStatement'

export function evaluate(statement: any, stateManager: StateManager, scope: string = 'main'): any {
  if (Array.isArray(statement)) {
    return stepThrough(statement, stateManager, scope)
  }

  switch (statement.type) {
    case 'PRINT':
      return printStatement(statement, stateManager, scope)
    case 'EMPTY':
      return empty
    case 'INTEGER':
    case 'STRING':
    case 'BOOLEAN':
      return literalExpression(statement, stateManager, scope)
    case 'LIST_DEF':
      return listDefinitionExpression(statement, stateManager, scope)
    case 'LIST_ACCESS':
      return listAccessExpression(statement, stateManager, scope)
    case 'LIST_ASSIGNMENT':
      return listAssignmentExpression(statement, stateManager, scope)
    case 'CONDITIONAL':
      return conditionalStatement(statement, stateManager, stateManager.createScope(scope))
    case 'RESERVE':
      return reserveStatement(statement, stateManager, scope)
    case 'NOT':
      return !Boolean(evaluate(statement.expression, stateManager, scope))
    case 'AND':
    case 'OR':
      return binaryLogicExpression(statement, stateManager, scope)
    case 'EQUAL_TO':
    case 'NOT_EQUAL_TO':
    case 'LESS_THAN':
    case 'GREATER_THAN':
    case 'LESS_THAN_EQUAL_TO':
    case 'GREATER_THAN_EQUAL_TO':
      return binaryComparisonExpression(statement, stateManager, scope)
    case 'ADDITION':
      return (
        evaluate(statement.left, stateManager, scope) +
        evaluate(statement.right, stateManager, scope)
      )
    case 'SUBTRACTION':
      return (
        evaluate(statement.left, stateManager, scope) -
        evaluate(statement.right, stateManager, scope)
      )
    case 'MULTIPLICATION':
      return (
        evaluate(statement.left, stateManager, scope) *
        evaluate(statement.right, stateManager, scope)
      )
    case 'DIVISION':
      const value = Math.floor((evaluate(statement.left, stateManager, scope) /
        evaluate(statement.right, stateManager, scope)) as number)

      if (isNaN(value)) {
        return empty
      }
      return value
    case 'FREE':
      return freeStatement(statement, stateManager, scope)
    case 'EXIT':
      return exitStatement(statement, stateManager, scope)
    case 'SKIP':
      return skipStatement(statement, stateManager, scope)
    case 'ASSIGNMENT':
      return assignmentStatement(statement, stateManager, scope)
    case 'RUN':
      return runExpression(statement, stateManager, scope)
    case 'IDENTIFIER':
      return identifierExpression(statement, stateManager, scope)
    case 'WHILE_LOOP':
      return whileLoopStatement(statement, stateManager, stateManager.createScope(scope))
    case 'FROM_LOOP':
      return fromLoopStatement(statement, stateManager, stateManager.createScope(scope))
    case 'FUNCTION_DEF':
      return functionDefinitionStatement(statement, stateManager, scope)
    case 'FUNCTION_CALL':
      return functionCallExpression(statement, stateManager, scope)
    case 'RETURN':
      return returnExpression(statement, stateManager, scope)
    case 'LENGTH_OF':
      return lengthExpression(statement, stateManager, scope)
    default:
      return
  }
}

export function stepThrough(statements: any[], stateManager: StateManager, scope?: string) {
  return statements.map(statement => {
    return evaluate(statement, stateManager, scope)
  })
}
