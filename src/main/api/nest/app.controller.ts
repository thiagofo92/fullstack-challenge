import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Test')
@Controller('test')
export class AppController {
  @Get('ping')
  @ApiOkResponse({ description: 'API comunicando' })
  ping(): string {
    return 'pong'
  }
}
