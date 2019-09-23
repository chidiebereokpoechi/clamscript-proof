import { BaseExpression } from './BaseExpression'
import { BaseStatement } from './BaseStatement'

export interface WhileLoopStatement extends BaseStatement {
  type: 'WHILE_LOOP'
  expression: BaseExpression
  body: BaseExpression | BaseExpression[]
}
