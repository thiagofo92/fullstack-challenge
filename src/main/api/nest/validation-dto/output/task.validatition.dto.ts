import { ApiProperty } from '@nestjs/swagger'
import { TaskStatus } from '../../../../../core/entities/task.entity'

export class TaskCreatedOutPutDto {
  @ApiProperty()
  id: string
}
export class TaskDeletedOutPutDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  idUser: string

  @ApiProperty()
  title: string

  @ApiProperty()
  description: string

  @ApiProperty()
  status: string

  @ApiProperty()
  endDate: Date
}

export class TaskListOutpDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  title: string

  @ApiProperty()
  description: string

  @ApiProperty({ enum: [TaskStatus.TODO, TaskStatus.DOING, TaskStatus.DONE] })
  status: TaskStatus

  @ApiProperty()
  endDate: Date
}

export class TaskSuccessOutPut {
  @ApiProperty()
  sucess: boolean
}
