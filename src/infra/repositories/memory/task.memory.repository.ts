import { randomUUID } from 'crypto'
import { TaskAppDtoOutput, TaskCreateAppDtoOutput } from 'src/app/dto/task.app.dto'
import { TaskEntity } from 'src/core/entities/task.entity'
import { TaskRepositoryPort } from 'src/infra/port'
import { Either, left, right } from '../../../shared/error/either'
import { IdNotFound } from '../../../shared/error/not-found.error'

export class TaskMemoryRepository implements TaskRepositoryPort {
  private readonly tasks: Array<TaskEntity> = []
  private readonly messageTaskIDNotFound = 'Task ID not found'
  private readonly messageUserIdNotFound = 'User ID not found'

  async create(input: TaskEntity): Promise<Either<Error, TaskCreateAppDtoOutput>> {
    input.id = randomUUID()
    this.tasks.push(input)

    return right({ id: input.id })
  }

  async filter(idUser: string, status: string): Promise<Either<Error, TaskAppDtoOutput>> {
    const result = this.tasks.filter((item) => item.idUser === idUser && item.status === status)
    return right(result)
  }

  async findByUserId(idUser: string): Promise<Either<Error, TaskAppDtoOutput | null>> {
    const tasks = this.tasks.filter((item) => item.idUser === idUser)

    return right(tasks)
  }

  async delete(id: string): Promise<Either<Error, boolean>> {
    const index = this.tasks.findIndex((item) => item.id === id)

    if (index < 0) return left(new IdNotFound(this.messageTaskIDNotFound))

    this.tasks.splice(index, 1)

    return right(true)
  }

  async update(input: TaskEntity): Promise<Either<Error, boolean>> {
    const index = this.tasks.findIndex((item) => item.id === input.id)

    if (index < 0) return left(new IdNotFound(this.messageTaskIDNotFound))

    this.tasks[index] = input
    return right(true)
  }
}
