import { BaseExpression } from './BaseExpression'

export interface LengthExpression extends BaseExpression {
  type: 'LENGTH_OF'
  expression: BaseExpression
}
