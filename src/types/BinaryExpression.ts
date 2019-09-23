import { BaseExpression } from './BaseExpression'

export interface BinaryExpression extends BaseExpression {
  type:
    | 'AND'
    | 'OR'
    | 'EQUAL_TO'
    | 'NOT_EQUAL_TO'
    | 'LESS_THAN'
    | 'LESS_THAN_EQUAL_TO'
    | 'GREATER_THAN'
    | 'GREATER_THAN_EQUAL_TO'
    | 'ADDITION'
    | 'SUBTRACTION'
    | 'MULTIPLICATION'
    | 'DIVISION'
  left: BaseExpression
  right: BaseExpression
}
