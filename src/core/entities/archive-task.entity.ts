import { TaskEntity } from './task.entity'

export type ArchiveTaskEntity = TaskEntity & {
  dateArchived: Date
}
