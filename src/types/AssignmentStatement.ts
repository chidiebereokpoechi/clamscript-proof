import { BaseExpression } from './BaseExpression'
import { BaseStatement } from './BaseStatement'

export interface AssignmentStatement extends BaseStatement {
  type: 'ASSIGNMENT'
  name: string
  expression: BaseExpression
}
