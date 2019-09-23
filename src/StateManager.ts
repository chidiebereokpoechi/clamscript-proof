import { empty, getType, Guid } from './util'

interface ScopeStore {
  [scope: string]: {
    parent: string
    functionScope?: boolean
    symbolTable: { [name: string]: string }
    variableStore: { [id: string]: any }
  }
}

export class StateManager {
  public scopeTable: ScopeStore = {
    main: {
      parent: undefined,
      symbolTable: {},
      variableStore: {},
    },
  }

  public functionsStack: any[] = []

  public exit = false
  public skip = false
  public returnValue: any = empty

  public createScope(currentScope: string = 'main', functionScope = false) {
    const id = Guid.newGuid()
    this.scopeTable[id] = {
      parent: currentScope,
      functionScope,
      symbolTable: {},
      variableStore: {},
    }

    return id
  }

  public isFunctionScope(scope: string) {
    do {
      if (this.scopeTable[scope].functionScope) {
        return true
      }
      scope = this.scopeTable[scope].parent
    } while (scope)
    return false
  }

  public lookup(name: string, scope: string = 'main') {
    do {
      const value = this.scopeTable[scope].symbolTable[name]
      if (value && getType(value) !== 'empty') {
        return [scope, this.scopeTable[scope].symbolTable[name]]
      }

      scope = this.scopeTable[scope].parent
    } while (scope)
    return undefined
  }

  public reserve(name: string, scope: string = 'main') {
    let id

    if (!this.lookup(name, scope)) {
      id = Guid.newGuid()
    } else {
      throw new Error('Error: Variable already exists.')
    }

    this.scopeTable[scope].symbolTable[name] = id
    this.scopeTable[scope].variableStore[id] = empty
  }

  public free(name: string, scope: string = 'main') {
    const found = this.lookup(name, scope)
    if (found) {
      delete this.scopeTable[found[0]].symbolTable[name]
      delete this.scopeTable[found[0]].variableStore[found[1]]
      return
    }

    throw new Error('Error: Variable does not exist.')
  }

  public assign(name: string, value: any, scope: string = 'main') {
    const found = this.lookup(name, scope)
    if (!found) {
      this.reserve(name, scope)
      this.scopeTable[scope].variableStore[this.lookup(name, scope)[1]] = value
    } else {
      this.scopeTable[found[0]].variableStore[found[1]] = value
    }
    return value
  }

  public retrieve(name: string, scope: string = 'main') {
    const found = this.lookup(name, scope)
    if (!found) {
      return empty
    }
    return this.scopeTable[found[0]].variableStore[found[1]] === undefined
      ? empty
      : this.scopeTable[found[0]].variableStore[found[1]]
  }
}
