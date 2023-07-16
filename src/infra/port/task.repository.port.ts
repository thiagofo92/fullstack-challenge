import { TaskAppDtoOutput, TaskAppListDtoOutput, TaskCreateAppDtoOutput } from 'src/app/dto/task.app.dto'
import { TaskEntity } from 'src/core/entities/task.entity'
import { Either } from 'src/shared/error/either'

export interface TaskRepositoryPort {
  create: (input: TaskEntity) => Promise<Either<Error, TaskCreateAppDtoOutput>>
  filter: (idUser: string, status: string) => Promise<Either<Error, TaskAppListDtoOutput>>
  findByUserId: (idUser: string) => Promise<Either<Error, TaskAppListDtoOutput | null>>
  delete: (id: string) => Promise<Either<Error, TaskAppDtoOutput>>
  update: (input: TaskEntity) => Promise<Either<Error, boolean>>
}
