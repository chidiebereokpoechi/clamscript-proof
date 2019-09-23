import { BaseExpression } from './BaseExpression'

export interface ListDefinitionExpression extends BaseExpression {
  type: 'LIST_DEF'
  body: BaseExpression[]
}
