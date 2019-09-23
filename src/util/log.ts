import { getType } from './typeInformation'

function prettify(value: any) {
  let string = '' + String(value)
  switch (getType(value)) {
    case 'string':
      string = `\x1b[32m'${value}'\x1b[0m`
      break
    case 'integer':
      string = `\x1b[33m${value}\x1b[0m`
      break
    case 'empty':
      string = '\x1b[2mempty\x1b[0m'
  }

  return string
}

export function log(value: any) {
  console.log(prettify(value))
}
