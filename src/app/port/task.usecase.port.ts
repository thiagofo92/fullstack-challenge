import { Either } from 'src/shared/error/either'
import { TaskAppDtoInput, TaskAppDtoOutput, TaskAppListDtoOutput, TaskCreateAppDtoOutput } from '../dto'

export abstract class TaskUseCasePort {
  create: (input: TaskAppDtoInput) => Promise<Either<Error, TaskCreateAppDtoOutput>>
  filter: (idUser: string, status: string) => Promise<Either<Error, TaskAppListDtoOutput>>
  findByUserId: (idUser: string) => Promise<Either<Error, TaskAppListDtoOutput | null>>
  delete: (id: string) => Promise<Either<Error, TaskAppDtoOutput>>
  update: (input: TaskAppDtoInput) => Promise<Either<Error, boolean>>
}
