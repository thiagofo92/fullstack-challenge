import { TaskEntity } from './task.entity'
import { UserEntity } from './user.entity'

export type UserTaskEntity = UserEntity & {
  task: Array<TaskEntity>
}
