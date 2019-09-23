import { evaluate } from '../evaluators'
import { StateManager } from '../StateManager'
import { empty } from './Empty'
import { ReturnCall } from './SpecialExceptions'

export class ClamFunction {
  private length = 0

  constructor(private argList: any[], private body: any, private stateManager: StateManager) {
    this.length = argList.length
  }

  public call(argList: any[], scope: string) {
    if (argList.length !== this.length) {
      throw new Error('Error: Incorrect number of arguments supplied.')
    }

    const localScope = this.stateManager.createScope(scope, true)

    this.argList.forEach((argument: string, index) => {
      this.stateManager.assign(argument, argList[index], localScope)
    })

    try {
      evaluate(this.body, this.stateManager, localScope)
    } catch (error) {
      if (error instanceof ReturnCall) {
        return error.value
      }

      throw error
    }

    return empty
  }
}
