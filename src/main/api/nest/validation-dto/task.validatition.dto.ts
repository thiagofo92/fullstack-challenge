import { IsNotEmpty, IsEnum, IsMongoId } from 'class-validator'
import { TaskStatus } from '../../../../core/entities/task.entity'

const messageMongoID = (type: string) => `Invalid ${type}`

export class TaskCreateValidationDto {
  @IsMongoId({
    message: messageMongoID('idUser'),
  })
  idUser: string

  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  description: string

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus

  endDate: Date
}

export class TaskUpdateValidationDto {
  @IsMongoId({
    message: messageMongoID('ID'),
  })
  id: string

  @IsNotEmpty()
  @IsMongoId({
    message: messageMongoID('idUser'),
  })
  idUser: string

  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  description: string

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus

  endDate: Date
}

export class TaskIdValidation {
  @IsMongoId({
    message: messageMongoID('ID'),
  })
  id: string
}

export class TaskFilterValidation {
  @IsMongoId({
    message: messageMongoID('idUser'),
  })
  idUser: string

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus
}

export class TaskUserIDValidation {
  @IsMongoId({
    message: messageMongoID('idUser'),
  })
  idUser: string
}
