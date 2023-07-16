import { UserRepositoryFailAuth } from 'src/infra/repositories/errors'
import { Either, left, right } from 'src/shared/error/either'
import { UserAppCreatedOutPutDto, UserAppInPutDto } from '../dto'
import { UserUseCasePort } from '../port'
import { UserRepositoryPort } from 'src/infra/port'

export class UserUseCase implements UserUseCasePort {
  constructor(private readonly repository: UserRepositoryPort) {}

  async create(input: UserAppInPutDto): Promise<Either<Error, UserAppCreatedOutPutDto>> {
    const result = await this.repository.create(input)

    if (result.isLeft()) return left(result.value)

    return right(result.value)
  }

  async validate(
    email: string,
    password: string
  ): Promise<Either<Error | UserRepositoryFailAuth, UserAppCreatedOutPutDto>> {
    const result = await this.repository.validate(email, password)

    if (result.isLeft()) return left(result.value)

    return right(result.value)
  }
}
