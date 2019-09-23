const spawn = require('cross-spawn')

export function run(command: string) {
  const [commandName, ...args] = command.split(/\s+/)
  try {
    let { stdout, stderr } = spawn.sync(commandName, args.filter(arg => arg.length))
    stdout = stdout.toString()
    stderr = stderr.toString()
    return stderr ? stderr : stdout
  } catch (error) {
    throw new Error('Error: There was an issue running your command.')
  }
}
