import { BaseExpression } from './BaseExpression'

export interface ListAccessExpression extends BaseExpression {
  type: 'LIST_ACCESS'
  list: BaseExpression
  index: BaseExpression
}
