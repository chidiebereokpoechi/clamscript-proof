import { BaseExpression } from './BaseExpression'
import { BaseStatement } from './BaseStatement'

export interface ConditionalStatement extends BaseStatement {
  type: 'CONDITIONAL'
  expression: BaseExpression
  main: BaseExpression | BaseExpression[]
  alt?: BaseExpression | BaseExpression[]
}
