import { BaseExpression } from './BaseExpression'

export interface RunExpression extends BaseExpression {
  type: 'RUN'
  expression: BaseExpression
}
