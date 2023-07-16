import { TaskAppDtoOutput, TaskCreateAppDtoOutput } from 'src/app/dto/task.app.dto'
import { TaskEntity } from 'src/core/entities/task.entity'
import { Either } from 'src/shared/error/either'

export interface TaskRepositoryPort {
  create: (input: TaskEntity) => Promise<Either<Error, TaskCreateAppDtoOutput>>
  filter: (idUser: string, status: string) => Promise<Either<Error, TaskAppDtoOutput>>
  findByUserId: (idUser: string) => Promise<Either<Error, TaskAppDtoOutput | null>>
  delete: (id: string) => Promise<Either<Error, boolean>>
  update: (input: TaskEntity) => Promise<Either<Error, boolean>>
}
