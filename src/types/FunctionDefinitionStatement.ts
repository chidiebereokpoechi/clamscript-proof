import { BaseExpression } from './BaseExpression'
import { BaseStatement } from './BaseStatement'

export interface FunctionDefinitionStatement extends BaseStatement {
  type: 'FUNCTION_DEF'
  name: string
  args: string[]
  body: BaseExpression | BaseExpression[]
}
