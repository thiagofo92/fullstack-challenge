import { TaskAppDtoOutput, TaskAppListDtoOutput, TaskCreateAppDtoOutput } from 'src/app/dto/task.app.dto'
import { TaskEntity, TaskStatus } from '../../../core/entities/task.entity'
import { TaskRepositoryPort } from '../../../infra/port'
import { Either, left, right } from '../../../shared/error/either'
import { IdNotFound } from '../../../shared/error/not-found.error'
import { UserTasksMongooseModel } from './model'
import { Types } from 'mongoose'
export class TaskMongooseRepository implements TaskRepositoryPort {
  private readonly tasks: Array<TaskEntity> = []
  private readonly messageTaskIDNotFound = 'Task ID not found'
  private readonly messageUserIdNotFound = 'User ID not found'

  async create(input: TaskEntity): Promise<Either<Error, TaskCreateAppDtoOutput>> {
    const _id = new Types.ObjectId()
    await UserTasksMongooseModel.updateOne(
      {
        _id: input.idUser,
      },
      {
        $push: {
          tasks: {
            _id,
            title: input.title,
            description: input.description,
            status: input.status,
            endDate: input.endDate,
          },
        },
      },
    )
    return right({ id: _id.toString() })
  }

  async filter(idUser: string, status: string): Promise<Either<Error, TaskAppListDtoOutput>> {
    const user = await UserTasksMongooseModel.findById(idUser)

    const tasks = user.tasks.filter((item) => item.status === status)
    const result: TaskAppListDtoOutput = tasks.map((item) => {
      return {
        id: String(item._id),
        title: item.title,
        description: item.description,
        status: TaskStatus[item.status],
        endDate: item.endDate,
      }
    })
    return right(result)
  }

  async findByUserId(idUser: string): Promise<Either<Error, TaskAppListDtoOutput | null>> {
    const user = await UserTasksMongooseModel.findById(idUser)
    const result: TaskAppListDtoOutput = user.tasks.map((item) => {
      return {
        id: String(item._id),
        title: item.title,
        description: item.description,
        status: TaskStatus[item.status],
        endDate: item.endDate,
      }
    })
    return right(result)
  }

  async delete(id: string): Promise<Either<Error, TaskAppDtoOutput>> {
    const user = await UserTasksMongooseModel.findOneAndUpdate(
      { 'tasks._id': id },
      {
        $pull: {
          tasks: {
            _id: id,
          },
        },
      },
    )

    if (!user) return left(new IdNotFound(this.messageTaskIDNotFound))
    const task = user.tasks.find((item) => String(item._id) === id)

    return right({
      id,
      idUser: user.id,
      title: task.title,
      description: task.description,
      status: TaskStatus[task.status],
      endDate: task.endDate,
    })
  }

  async update(input: TaskEntity): Promise<Either<Error, boolean>> {
    const index = this.tasks.findIndex((item) => item.id === input.id)

    if (index < 0) return left(new IdNotFound(this.messageTaskIDNotFound))

    this.tasks[index] = input
    return right(true)
  }
}
