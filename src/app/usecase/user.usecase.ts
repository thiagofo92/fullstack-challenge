import { Logger } from '@nestjs/common'
import { UserRepositoryFailAuth } from '../../infra/repositories/errors'
import { Either, left, right } from '../../shared/error/either'
import { UserAppCreatedOutPutDto, UserAppInPutDto } from '../dto'
import { UserUseCasePort } from '../port'
import { UserRepositoryPort } from '../../infra/port'

export class UserUseCase implements UserUseCasePort {
  constructor(private readonly repository: UserRepositoryPort, private readonly logger: Logger) {}

  async create(input: UserAppInPutDto): Promise<Either<Error, UserAppCreatedOutPutDto>> {
    this.logger.log(`UseUserca create a new user ${input.name}`)
    const result = await this.repository.create(input)

    if (result.isLeft()) return left(result.value)
    this.logger.log(`Success to create a user: ${input.name}`)
    return right(result.value)
  }

  async validate(
    email: string,
    password: string,
  ): Promise<Either<Error | UserRepositoryFailAuth, UserAppCreatedOutPutDto>> {
    this.logger.log(`Start to auth the user`)
    const result = await this.repository.validate(email, password)

    if (result.isLeft()) return left(result.value)

    this.logger.log(`Success to auth the user`)
    return right(result.value)
  }
}
