import { BaseStatement } from './BaseStatement'

export interface SkipStatement extends BaseStatement {
  type: 'SKIP'
}
