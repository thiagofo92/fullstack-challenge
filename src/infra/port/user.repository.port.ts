import { UserAppCreatedOutPutDto } from 'src/app/dto'
import { Either } from 'src/shared/error/either'
import { UserRepositoryFailAuth } from '../repositories/errors'

export interface UserRepositoryPort {
  create: () => Promise<Either<Error, UserAppCreatedOutPutDto>>
  validate: () => Promise<
    Either<UserRepositoryFailAuth, UserAppCreatedOutPutDto>
  >
}
