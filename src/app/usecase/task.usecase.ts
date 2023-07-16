import { TaskEntity } from 'src/core/entities/task.entity'
import { Either, left, right } from 'src/shared/error/either'
import { TaskCreateAppDtoOutput, TaskAppDtoOutput, TaskAppDtoInput } from '../dto'
import { TaskUseCasePort } from '../port'
import { TaskRepositoryPort } from 'src/infra/port'

export class TaskUseCase implements TaskUseCasePort {
  constructor(private readonly repository: TaskRepositoryPort) {}
  async create(input: TaskEntity): Promise<Either<Error, TaskCreateAppDtoOutput>> {
    const result = await this.repository.create(input)

    if (result.isLeft()) return left(result.value)

    return right(result.value)
  }

  async filter(idUser: string, status: string): Promise<Either<Error, TaskAppDtoOutput>> {
    const result = await this.repository.filter(idUser, status)

    if (result.isLeft()) return left(result.value)

    return right(result.value)
  }

  async findByUserId(idUser: string): Promise<Either<Error, TaskAppDtoOutput>> {
    const result = await this.repository.findByUserId(idUser)

    if (result.isLeft()) return left(result.value)

    return right(result.value)
  }

  async delete(id: string): Promise<Either<Error, boolean>> {
    const result = await this.repository.delete(id)

    if (result.isLeft()) return left(result.value)

    return right(result.value)
  }

  async update(input: TaskAppDtoInput): Promise<Either<Error, boolean>> {
    const result = await this.repository.update(input)

    if (result.isLeft()) return left(result.value)

    return right(result.value)
  }
}
