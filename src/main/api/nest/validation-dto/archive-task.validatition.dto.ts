import { IsNotEmpty, IsEnum, IsMongoId } from 'class-validator'
import { TaskStatus } from '../../../../core/entities/task.entity'

const messageMongoID = (type: string) => `Invalid ${type} ID`
export class ArchiveTaskValidationDto {
  @IsMongoId({
    message: messageMongoID('idTask'),
  })
  idTask: string
}

export class ArchiveTaskFindByUserIdValidationDto {
  @IsMongoId({
    message: messageMongoID('idUser'),
  })
  idUser: string
}
