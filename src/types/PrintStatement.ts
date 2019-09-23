import { BaseExpression } from './BaseExpression'
import { BaseStatement } from './BaseStatement'

export interface PrintStatement extends BaseStatement {
  type: 'PRINT'
  expression: BaseExpression
}
