import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ArchiveTaskValidationInputDto {
  @ApiProperty()
  @IsNotEmpty()
  idTask: string
}

export class ArchiveTaskFindByUserIdValidationInputDto {
  @ApiProperty()
  @IsNotEmpty()
  idUser: string
}
