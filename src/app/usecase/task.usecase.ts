import { TaskEntity } from '../../core/entities/task.entity'
import { Either, left, right } from '../../shared/error/either'
import { TaskCreateAppDtoOutput, TaskAppListDtoOutput, TaskAppDtoInput, TaskAppDtoOutput } from '../dto'
import { TaskUseCasePort } from '../port'
import { TaskRepositoryPort } from '../../infra/port'
import { Logger } from '@nestjs/common'

export class TaskUseCase implements TaskUseCasePort {
  constructor(private readonly repository: TaskRepositoryPort, private readonly logger: Logger) {}
  async create(input: TaskEntity): Promise<Either<Error, TaskCreateAppDtoOutput>> {
    this.logger.log(`Start to create a new task used ID: ${input.idUser}`)
    const result = await this.repository.create(input)

    if (result.isLeft()) return left(result.value)

    this.logger.log(`Success to create a new task for user ID ${input.idUser}`)
    return right(result.value)
  }

  async filter(idUser: string, status: string): Promise<Either<Error, TaskAppListDtoOutput>> {
    this.logger.log(`Filter the tasks by status for user - Status ${status}`)
    const result = await this.repository.filter(idUser, status)

    if (result.isLeft()) return left(result.value)
    this.logger.log(`Success to filter the status for user - Status ${status}`)
    return right(result.value)
  }

  async findByUserId(idUser: string): Promise<Either<Error, TaskAppListDtoOutput>> {
    this.logger.log(`Find tasks by user ID`)
    const result = await this.repository.findByUserId(idUser)

    if (result.isLeft()) return left(result.value)
    this.logger.log(`Success to get tasks for user`)
    return right(result.value)
  }

  async delete(id: string): Promise<Either<Error, TaskAppDtoOutput>> {
    this.logger.log(`Delete the task ID: ${id}`)
    const result = await this.repository.delete(id)

    if (result.isLeft()) return left(result.value)

    this.logger.log(`Success to delete the task ID: ${id}`)
    return right(result.value)
  }

  async update(input: TaskAppDtoInput): Promise<Either<Error, boolean>> {
    this.logger.log(`Start to update the task`)
    const result = await this.repository.update(input)

    if (result.isLeft()) return left(result.value)
    this.logger.log(`Success to update the task`)
    return right(result.value)
  }
}
