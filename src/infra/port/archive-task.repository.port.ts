import { ArchiveTaskEntity } from 'src/core/entities/archive-task.entity'
import { ArchiveTaskAppOutputDto } from 'src/app/dto'
import { Either } from 'src/shared/error/either'

export interface ArchiveTaskRepositoryPort {
  create: (input: ArchiveTaskEntity) => Promise<Either<Error, boolean>>
  findByUserId: (idUser: string) => Promise<Either<Error, ArchiveTaskAppOutputDto>>
}
