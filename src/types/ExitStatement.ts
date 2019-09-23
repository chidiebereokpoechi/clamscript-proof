import { BaseStatement } from './BaseStatement'

export interface ExitStatement extends BaseStatement {
  type: 'EXIT'
}
