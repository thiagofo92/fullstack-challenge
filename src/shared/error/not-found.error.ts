export class IdNotFound extends Error {
  constructor(message: string) {
    super()
    this.name = 'IdNotFound'
    this.message = message
  }
}
