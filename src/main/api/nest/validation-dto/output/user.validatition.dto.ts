import { ApiProperty } from '@nestjs/swagger'

export class UserTokenAccessOutputDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  token: string

  @ApiProperty()
  name: string
}
