import { IsNotEmpty, IsEnum } from 'class-validator'
import { TaskStatus } from '../../../../../core/entities/task.entity'
import { ApiProperty } from '@nestjs/swagger'

export class TaskCreateValidationInputDto {
  @ApiProperty()
  @IsNotEmpty()
  idUser: string

  @ApiProperty()
  @IsNotEmpty()
  title: string

  @ApiProperty()
  @IsNotEmpty()
  description: string

  @ApiProperty({ enum: [TaskStatus.TODO, TaskStatus.DOING, TaskStatus.DONE] })
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus

  @ApiProperty()
  @IsNotEmpty()
  endDate: Date
}

export class TaskUpdateValidationInputDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string

  @ApiProperty()
  @IsNotEmpty()
  idUser: string

  @ApiProperty()
  @IsNotEmpty()
  title: string

  @ApiProperty()
  @IsNotEmpty()
  description: string

  @ApiProperty({ enum: [TaskStatus.TODO, TaskStatus.DOING, TaskStatus.DONE] })
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus

  @ApiProperty()
  @IsNotEmpty()
  endDate: Date
}

export class TaskIdValidationInputDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string
}

export class TaskFilterValidationInputDto {
  @ApiProperty()
  @IsNotEmpty()
  idUser: string

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus
}

export class TaskUserIDValidationInputDto {
  @ApiProperty()
  @IsNotEmpty()
  idUser: string
}
