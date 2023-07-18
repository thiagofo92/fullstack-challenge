import { TaskEntity } from 'src/core/entities/task.entity'

export type TaskAppDtoInput = TaskEntity
export type TaskAppListDtoOutput = Array<Omit<TaskEntity, 'idUser'>>
export type TaskAppDtoOutput = TaskEntity
export interface TaskCreateAppDtoOutput {
  id: string
}
