import { BaseExpression } from './BaseExpression'
import { BaseStatement } from './BaseStatement'

export interface FromLoopStatement extends BaseStatement {
  type: 'FROM_LOOP'
  counter: string
  lower: BaseExpression
  upper: BaseExpression
  body: BaseExpression | BaseExpression[]
}
