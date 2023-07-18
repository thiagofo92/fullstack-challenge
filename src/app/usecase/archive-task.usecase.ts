import { ArchiveTaskEntity } from '../../core/entities/archive-task.entity'
import { Either, left, right } from '../../shared/error/either'
import { ArchiveTaskAppOutputDto } from '../dto'
import { ArchiveTaskUseCasePort } from '../port'
import { ArchiveTaskRepositoryPort, TaskRepositoryPort } from '../../infra/port'
import { Logger } from '@nestjs/common'
import { IdNotFound } from 'src/shared/error/not-found.error'

export class ArchiveTaskUseCase implements ArchiveTaskUseCasePort {
  constructor(
    private readonly repositoryArchiveTask: ArchiveTaskRepositoryPort,
    private readonly repositoryTask: TaskRepositoryPort,
    private readonly logger: Logger,
  ) {}

  async create(idTask: string): Promise<Either<Error | IdNotFound, boolean>> {
    this.logger.log(`Start to create a archive`)
    const task = await this.repositoryTask.delete(idTask)

    if (task.isLeft()) return left(task.value)

    this.logger.log(`Success to delete the task`)
    const archive: ArchiveTaskEntity = {
      idTask: task.value.id,
      title: task.value.title,
      description: task.value.description,
      status: task.value.status,
      endDate: task.value.endDate,
      idUser: task.value.idUser,
      dateArchived: new Date(),
    }
    const result = await this.repositoryArchiveTask.create(archive)

    if (result.isLeft()) return left(result.value)

    this.logger.log(`Success to create a archive task`)
    return right(result.value)
  }

  async findByUserId(idUser: string): Promise<Either<Error, ArchiveTaskAppOutputDto>> {
    this.logger.log(`Start to find the archive task by user ID`)
    const result = await this.repositoryArchiveTask.findByUserId(idUser)
    if (result.isLeft()) return left(result.value)
    this.logger.log(`Success to find all archive by user id`)
    return right(result.value)
  }
}
