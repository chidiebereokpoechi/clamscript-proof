import { BaseStatement } from './BaseStatement'

export interface FreeStatement extends BaseStatement {
  type: 'FREE'
  name: string
}
