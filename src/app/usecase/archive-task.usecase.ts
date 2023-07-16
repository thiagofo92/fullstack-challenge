import { ArchiveTaskEntity } from 'src/core/entities/archive-task.entity'
import { Either, left, right } from 'src/shared/error/either'
import { ArchiveTaskAppOutputDto } from '../dto'
import { ArchiveTaskUseCasePort } from '../port'
import { ArchiveTaskRepositoryPort } from 'src/infra/port'

export class ArchiveTaskUseCase implements ArchiveTaskUseCasePort {
  constructor(private readonly repository: ArchiveTaskRepositoryPort) {}
  async create(input: ArchiveTaskEntity): Promise<Either<Error, boolean>> {
    const result = await this.repository.create(input)
    if (result.isLeft()) return left(result.value)
    return right(result.value)
  }

  async findByUserId(idUser: string): Promise<Either<Error, ArchiveTaskAppOutputDto>> {
    const result = await this.repository.findByUserId(idUser)
    if (result.isLeft()) return left(result.value)
    return right(result.value)
  }
}
