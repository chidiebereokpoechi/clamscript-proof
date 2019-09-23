import { BaseExpression } from './BaseExpression'

export interface ListAssignmentExpression extends BaseExpression {
  type: 'LIST_ASSIGNMENT'
  list: BaseExpression
  index: BaseExpression
  value: BaseExpression
}
