import { Controller, Post, Get, Body, Query, UseGuards, Res, Req, Logger } from '@nestjs/common'
import { ArchiveTaskUseCasePort } from 'src/app/port'
import { ArchiveTaskFindByUserIdValidationInputDto, ArchiveTaskValidationInputDto } from '../../validation-dto/input'
import { AuthGuard } from '../../guard/auth.guard'
import { HttpDataResponse } from '../../../../../main/api/util/http-data-response'
import { HTTP_STATUS } from '../../../../../main/api/util/http-status'
import { Request, Response } from 'express'
import { IdNotFound } from '../../../../../shared/error/not-found.error'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { ArchiveTaskListOutPutDto, ArchiveTaskSuccessOutPutDto } from '../../validation-dto/output'

@ApiTags('Archive-Task')
@Controller('archive-task')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ArchiveTaskController {
  constructor(private readonly usecase: ArchiveTaskUseCasePort, private readonly logger: Logger) {}

  @Post()
  @ApiCreatedResponse({ description: 'Criado com sucesso ', type: ArchiveTaskSuccessOutPutDto })
  @ApiBadRequestResponse({ description: 'Parâmetro(s) inválido' })
  @ApiUnauthorizedResponse({ description: 'Token inválido' })
  @ApiNotFoundResponse({ description: 'ID não encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno' })
  async create(@Req() req: Request, @Body() input: ArchiveTaskValidationInputDto, @Res() res: Response) {
    const user = req['user']
    this.logger.log(`User ID: ${user.sub} creating a new Archive task`)

    const result = await this.usecase.create(input.idTask)

    if (result.isLeft()) {
      const error = this.checkError(result.value)
      this.logger.error(`Error to create a archive task ${result.value}`)
      res.status(error.statusCode).json(error.message)
      return
    }

    this.logger.log(`Success to create a archive task`)
    res.status(HTTP_STATUS.CREATED).json(result.value)
    return
  }

  @Get()
  @ApiOkResponse({ description: 'Usuário localizado', type: ArchiveTaskListOutPutDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Parâmetro(s) inválido' })
  @ApiUnauthorizedResponse({ description: 'Token inválido' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno' })
  async findByUserId(
    @Req() req: Request,
    @Query() { idUser }: ArchiveTaskFindByUserIdValidationInputDto,
    @Res() res: Response,
  ) {
    const user = req['user']
    this.logger.log(`User ID: ${user.sub} find the archives by ID`)
    const result = await this.usecase.findByUserId(idUser)

    if (result.isLeft()) {
      const error = this.checkError(result.value)
      this.logger.error(`Error to find all archive task by user ID message: ${result.value}`)
      res.status(error.statusCode).json(error.message)
      return
    }
    res.status(HTTP_STATUS.OK).json(result.value)
    return
  }

  private checkError(error: Error): HttpDataResponse {
    if (error instanceof IdNotFound) {
      return {
        statusCode: HTTP_STATUS.BAD_REQUEST,
        message: error.message,
      }
    }

    return {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    }
  }
}
