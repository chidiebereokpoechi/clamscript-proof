import { BaseExpression } from './BaseExpression'

export interface FunctionCallExpression extends BaseExpression {
  type: 'FUNCTION_CALL'
  name: string
  args: BaseExpression[]
}
