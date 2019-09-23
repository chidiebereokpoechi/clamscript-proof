import { BaseExpression } from './BaseExpression'

export interface UnaryExpression extends BaseExpression {
  type: 'NOT'
  expression: BaseExpression
}
