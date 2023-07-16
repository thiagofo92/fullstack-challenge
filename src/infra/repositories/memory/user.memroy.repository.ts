import { UserAppCreatedOutPutDto } from 'src/app/dto'
import { Either, left, right } from '../../../shared/error/either'
import { UserRepositoryPort } from '../../port'
import { UserRepositoryFailAuth } from '../errors'
import { UserEntity } from 'src/core/entities/user.entity'
import { randomUUID } from 'crypto'

export class UserMemoryRepository implements UserRepositoryPort {
  private readonly users: Array<UserEntity> = []

  async create(input: UserEntity): Promise<Either<Error, UserAppCreatedOutPutDto>> {
    input.id = randomUUID()
    this.users.push(input)

    return right({ id: input.id })
  }

  async validate(
    email: string,
    password: string,
  ): Promise<Either<Error | UserRepositoryFailAuth, UserAppCreatedOutPutDto>> {
    const user = this.users.find((item) => item.email === email && item.password === password)

    if (!user) return left(new UserRepositoryFailAuth())

    return right({ id: user.id })
  }
}
