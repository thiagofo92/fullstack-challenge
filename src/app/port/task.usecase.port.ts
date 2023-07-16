import { Either } from 'src/shared/error/either'
import { TaskAppDtoInput, TaskAppDtoOutput, TaskCreateAppDtoOutput } from '../dto'

export interface TaskUseCasePort {
  create: (input: TaskAppDtoInput) => Promise<Either<Error, TaskCreateAppDtoOutput>>
  filter: (idUser: string, status: string) => Promise<Either<Error, TaskAppDtoOutput>>
  findByUserId: (idUser: string) => Promise<Either<Error, TaskAppDtoOutput | null>>
  delete: (id: string) => Promise<Either<Error, boolean>>
  update: (input: TaskAppDtoInput) => Promise<Either<Error, boolean>>
}
