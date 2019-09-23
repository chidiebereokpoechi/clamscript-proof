import { empty } from './'

export class ClamArray {
  constructor(private contents: any[]) {}

  public retrieve(index: number) {
    if (this.contents.length - 1 < index) {
      return empty
    }

    return this.contents[index]
  }

  public assign(index: number, value: any) {
    this.contents[index] = value
  }

  public getLength() {
    return this.contents.length
  }

  public getContents() {
    return this.contents
  }

  public toString() {
    return '{ ' + this.contents.join(', ') + ' }'
  }
}
