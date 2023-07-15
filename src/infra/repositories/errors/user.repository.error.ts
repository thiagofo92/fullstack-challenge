export class UserRepositoryFailAuth extends Error {
  constructor() {
    super()
    this.message = 'Fail to authenticate the user, verify the email or password'
  }
}
