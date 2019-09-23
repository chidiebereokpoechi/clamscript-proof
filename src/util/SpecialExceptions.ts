export class ReturnCall extends Error {
  constructor(public value: any) {
    super()
  }
}

export class Exit extends Error {
  constructor() {
    super()
  }
}

export class Skip extends Error {
  constructor() {
    super()
  }
}
