import { BaseExpression } from './BaseExpression'

export interface IdentifierExpression extends BaseExpression {
  type: 'IDENTIFIER'
  name: string
}
