import { ApiProperty } from '@nestjs/swagger'

export class ArchiveTaskSuccessOutPutDto {
  @ApiProperty()
  success: boolean
}

export class ArchiveTaskListOutPutDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  idTask: string

  @ApiProperty()
  idUser: string

  @ApiProperty()
  title: string

  @ApiProperty()
  description: string

  @ApiProperty()
  endDate: Date

  @ApiProperty()
  dateArchived: Date
}
