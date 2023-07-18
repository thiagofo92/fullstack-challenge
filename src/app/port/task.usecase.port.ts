import { Either } from 'src/shared/error/either'
import { TaskAppDtoInput, TaskAppDtoOutput, TaskAppListDtoOutput, TaskCreateAppDtoOutput } from '../dto'
import { IdNotFound } from 'src/shared/error/not-found.error'

export abstract class TaskUseCasePort {
  create: (input: TaskAppDtoInput) => Promise<Either<Error, TaskCreateAppDtoOutput>>
  filter: (idUser: string, status: string) => Promise<Either<Error, TaskAppListDtoOutput>>
  findByUserId: (idUser: string) => Promise<Either<Error, TaskAppListDtoOutput | null>>
  delete: (id: string) => Promise<Either<Error | IdNotFound, TaskAppDtoOutput>>
  update: (input: TaskAppDtoInput) => Promise<Either<Error | IdNotFound, boolean>>
}
