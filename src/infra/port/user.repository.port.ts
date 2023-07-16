import { UserAppCreatedOutPutDto } from 'src/app/dto'
import { Either } from 'src/shared/error/either'
import { UserRepositoryFailAuth } from '../repositories/errors'
import { UserEntity } from 'src/core/entities/user.entity'

export interface UserRepositoryPort {
  create: (inpu: UserEntity) => Promise<Either<Error, UserAppCreatedOutPutDto>>
  validate: (email: string, password: string) => Promise<Either<UserRepositoryFailAuth, UserAppCreatedOutPutDto>>
}
