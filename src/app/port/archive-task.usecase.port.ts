import { Either } from 'src/shared/error/either'
import { ArchiveTaskAppInputDto, ArchiveTaskAppOutputDto } from '../dto'

export interface ArchiveTaskUseCasePort {
  create: (input: ArchiveTaskAppInputDto) => Promise<Either<Error, boolean>>
  findByUserId: (idUser: string) => Promise<Either<Error, ArchiveTaskAppOutputDto>>
}
