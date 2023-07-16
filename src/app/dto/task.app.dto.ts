import { TaskEntity } from 'src/core/entities/task.entity'

export type TaskAppDtoInput = TaskEntity
export type TaskAppDtoOutput = Array<TaskEntity>
export interface TaskCreateAppDtoOutput {
  id: string
}
