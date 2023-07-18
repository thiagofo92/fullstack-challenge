import { TaskEntity } from './task.entity'

export type ArchiveTaskEntity = TaskEntity & {
  idTask: string
  dateArchived: Date
}
