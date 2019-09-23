import { ClamArray } from './'

export function getType(element: any) {
  switch (typeof element) {
    case 'string':
      return 'string'
    case 'number':
      return 'integer'
    case 'boolean':
      return 'boolean'
    case 'object':
      if (element instanceof ClamArray) {
        return 'array'
      }

      if (element === null) {
        return 'empty'
      }
    case 'undefined':
    default:
      return 'empty'
  }
}
