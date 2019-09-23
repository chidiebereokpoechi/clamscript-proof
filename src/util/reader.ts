import * as readline from 'readline'

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '--> ',
})

reader.setMaxListeners(2000000000)

reader.on('close', () => {
  console.log('Exiting gracefully...')
})

export const query = function(): Promise<any> {
  reader.prompt()

  return new Promise((resolve, reject) => {
    reader.on('line', (line: string) => {
      const response = line.trim()

      if (response === ':exit') {
        reader.close()
      } else {
        resolve(response)
      }
    })
  })
}
