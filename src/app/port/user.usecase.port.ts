import { Either } from 'src/shared/error/either'
import { UserAppCreatedOutPutDto, UserAppInPutDto } from '../dto'
import { UserRepositoryFailAuth } from 'src/infra/repositories/errors'

export interface UserUseCasePort {
  create: (input: UserAppInPutDto) => Promise<Either<Error, UserAppCreatedOutPutDto>>
  validate: (
    email: string,
    password: string
  ) => Promise<Either<Error | UserRepositoryFailAuth, UserAppCreatedOutPutDto>>
}
