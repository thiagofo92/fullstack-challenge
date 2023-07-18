import { Either } from 'src/shared/error/either'
import { ArchiveTaskAppOutputDto } from '../dto'
import { IdNotFound } from 'src/shared/error/not-found.error'

export abstract class ArchiveTaskUseCasePort {
  create: (idTask: string) => Promise<Either<Error | IdNotFound, boolean>>
  findByUserId: (idUser: string) => Promise<Either<Error, ArchiveTaskAppOutputDto>>
}
