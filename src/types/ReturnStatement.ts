import { BaseExpression } from './BaseExpression'
import { BaseStatement } from './BaseStatement'

export interface ReturnStatement extends BaseStatement {
  type: 'RETURN'
  expression: BaseExpression
}
