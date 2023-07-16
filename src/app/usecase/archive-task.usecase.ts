import { ArchiveTaskEntity } from '../../core/entities/archive-task.entity'
import { Either, left, right } from '../../shared/error/either'
import { ArchiveTaskAppOutputDto } from '../dto'
import { ArchiveTaskUseCasePort } from '../port'
import { ArchiveTaskRepositoryPort, TaskRepositoryPort } from '../../infra/port'

export class ArchiveTaskUseCase implements ArchiveTaskUseCasePort {
  constructor(
    private readonly repositoryArchiveTask: ArchiveTaskRepositoryPort,
    private readonly repositoryTask: TaskRepositoryPort,
  ) {}

  async create(idTask: string): Promise<Either<Error, boolean>> {
    const task = await this.repositoryTask.delete(idTask)

    if (task.isLeft()) return left(task.value)

    const archive: ArchiveTaskEntity = {
      ...task.value,
      dateArchived: new Date(),
    }
    const result = await this.repositoryArchiveTask.create(archive)

    if (result.isLeft()) return left(result.value)
    return right(result.value)
  }

  async findByUserId(idUser: string): Promise<Either<Error, ArchiveTaskAppOutputDto>> {
    const result = await this.repositoryArchiveTask.findByUserId(idUser)
    if (result.isLeft()) return left(result.value)
    return right(result.value)
  }
}
