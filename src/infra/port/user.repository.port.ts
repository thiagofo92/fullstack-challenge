import { UserAppCreatedOutPutDto } from 'src/app/dto'
import { Either } from 'src/shared/error/either'

export interface UserRepositoryPort {
  create: () => Promise<Either<Error, UserAppCreatedOutPutDto>>
  validate: () => Promise<Either<Error, UserAppCreatedOutPutDto>>
}
