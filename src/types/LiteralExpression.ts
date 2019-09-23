import { BaseExpression } from './BaseExpression'

export interface LiteralExpression extends BaseExpression {
  type: 'INTEGER' | 'STRING' | 'BOOLEAN'
  value: number | string | boolean
}
