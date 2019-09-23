export class Reporter {
  public static report(error: string) {
    console.log('The error ' + error + ' has occured.')
    throw new Error('Runtime exception.')
  }
}
