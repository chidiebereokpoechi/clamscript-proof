import { BaseStatement } from './BaseStatement'

export interface ReserveStatement extends BaseStatement {
  type: 'RESERVE'
  variableNames: string[]
}
