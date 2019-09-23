import * as fs from 'fs'

import { StateManager } from './'
import { evaluate } from './evaluators'
import { stepThrough } from './evaluators'
import { flatten, log, query } from './util'

export class ClamScript {
  public static main(args: string[]): void {
    args = args.slice(2)

    if (args.length > 1) {
      console.log('Usage: clamscript [script]')
      process.exit(64)
    } else if (args.length === 1) {
      this.runFile(args[0])
    } else {
      this.runPrompt()
    }
  }

  public static runFile(path: string) {
    try {
      const source = fs.readFileSync(path).toString()
      const parsed = this.parser.parse(source) as any[]
      // console.log(JSON.stringify(parsed, null, 2))
      stepThrough(parsed, this.stateManager)
      process.exit(0)
    } catch (error) {
      this.report(error, true)
    }
  }

  public static report(error: Error, shouldQuit?: boolean) {
    console.error('\x1b[31m%s\x1b[0m', error.message)

    if (shouldQuit) {
      process.exit(1)
    }
  }

  public static async runPrompt(): Promise<void> {
    while (true) {
      try {
        const sourceLine = await query()
        const parsedLine = this.parser.parse(sourceLine) as any[]
        const evaledLine = flatten(evaluate(parsedLine, this.stateManager))[0]
        log(evaledLine)
      } catch (error) {
        this.report(error)
      }
    }
  }
  private static stateManager = new StateManager()
  private static parser = require('./parser/parser').parser
}

ClamScript.main(process.argv)
