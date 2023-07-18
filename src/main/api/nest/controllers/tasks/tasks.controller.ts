import { Controller, Post, Body, Put, Delete, Query, Get, UseGuards, Req, Logger, Res } from '@nestjs/common'
import { TaskUseCasePort } from 'src/app/port'
import {
  TaskCreateValidationInputDto,
  TaskFilterValidationInputDto,
  TaskIdValidationInputDto,
  TaskUpdateValidationInputDto,
  TaskUserIDValidationInputDto,
} from '../../validation-dto/input'
import { AuthGuard } from '../../guard/auth.guard'
import { Request, Response } from 'express'
import { HttpDataResponse } from 'src/main/api/util/http-data-response'
import { HTTP_STATUS } from 'src/main/api/util/http-status'
import { IdNotFound } from 'src/shared/error/not-found.error'
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
import {
  TaskCreatedOutPutDto,
  TaskDeletedOutPutDto,
  TaskListOutpDto,
  TaskSuccessOutPut,
} from '../../validation-dto/output'

@ApiTags('Task')
@Controller('tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly usecase: TaskUseCasePort, private readonly logger: Logger) {}

  @Post()
  @ApiCreatedResponse({ description: 'Tarefa criado com sucesso', type: TaskCreatedOutPutDto })
  @ApiBadRequestResponse({ description: 'Parâmetro(s) inválido' })
  @ApiUnauthorizedResponse({ description: 'Token inválido' })
  async create(@Body() input: TaskCreateValidationInputDto, @Req() req: Request, @Res() res: Response) {
    const payload = req['user']
    this.logger.log(`User ID:${payload.sub}, creating a new task`)
    const result = await this.usecase.create(input)

    if (result.isLeft()) {
      const error = this.checkError(result.value)
      this.logger.error(`Error to create a new task message: ${result.value}`)
      return res.status(error.statusCode).json(error.message)
    }

    return res.status(HTTP_STATUS.CREATED).json(result.value)
  }

  @Put()
  @ApiOkResponse({ description: 'Atualizado com sucesso', type: TaskSuccessOutPut })
  @ApiBadRequestResponse({ description: 'Parâmetro(s) inválido' })
  @ApiUnauthorizedResponse({ description: 'Token inválido' })
  @ApiNotFoundResponse({ description: 'ID não localizaod' })
  @ApiInternalServerErrorResponse({ description: 'Error interno' })
  async update(@Body() input: TaskUpdateValidationInputDto, @Req() req: Request, @Res() res: Response) {
    const user = req['user']
    this.logger.log(`User start to update the task user ID: ${user.sub}`)
    const result = await this.usecase.update(input)

    if (result.isLeft()) {
      const error = this.checkError(result.value)
      this.logger.error(`Error to update the user task message: ${result.value}`)
      res.status(error.statusCode).json(error.message)
      return
    }

    this.logger.log(`Success to update user task`)
    res.status(HTTP_STATUS.OK).json({ success: result.value })
    return
  }

  @Delete()
  @ApiOkResponse({ description: 'Sucesso ao deletar a task', type: TaskDeletedOutPutDto })
  @ApiBadRequestResponse({ description: 'Parâmetro(s) inválido' })
  @ApiUnauthorizedResponse({ description: 'Token inválido' })
  @ApiNotFoundResponse({ description: 'ID não localizado' })
  @ApiInternalServerErrorResponse({ description: 'Error interno' })
  async delete(@Query() { id }: TaskIdValidationInputDto, @Req() req: Request, @Res() res: Response) {
    const payload = req['user']
    this.logger.log(`User ID:${payload.sub}, delete a task`)
    const result = await this.usecase.delete(id)

    if (result.isLeft()) {
      const error = this.checkError(result.value)
      this.logger.error(`Error to delete the user task message: ${result.value}`)
      res.status(error.statusCode).json(error.message)
      return
    }

    this.logger.log(`Success to delete the user task`)
    res.status(HTTP_STATUS.OK).json(result.value)
    return
  }

  @Get('/filter')
  @ApiOkResponse({ type: TaskListOutpDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Parâmetro(s) inválido' })
  @ApiUnauthorizedResponse({ description: 'Token inválido' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno ' })
  async filter(@Query() { idUser, status }: TaskFilterValidationInputDto, @Req() req: Request, @Res() res: Response) {
    const payload = req['user']
    this.logger.log(`User ID:${payload.sub}, filter a task by status: ${status}`)
    const result = await this.usecase.filter(idUser, status)

    if (result.isLeft()) {
      const error = this.checkError(result.value)
      this.logger.error(`Error to delete the user task message: ${result.value}`)
      res.status(error.statusCode).json(error.message)
      return
    }
    this.logger.log(`Success to filter the status ${status}`)

    res.status(HTTP_STATUS.OK).json(result.value)
    return
  }

  @Get('/all')
  @ApiOkResponse({ type: TaskListOutpDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Parâmetro(s) inválido' })
  @ApiUnauthorizedResponse({ description: 'Token inválido' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno' })
  async findByUserId(@Query() { idUser }: TaskUserIDValidationInputDto, @Req() req: Request, @Res() res: Response) {
    const payload = req['user']
    this.logger.log(`User ID:${payload.sub}, find a task by user ID`)
    const result = await this.usecase.findByUserId(idUser)

    if (result.isLeft()) {
      const error = this.checkError(result.value)
      this.logger.error(`Error to find a taks by user ID message: ${result.value}`)
      res.status(error.statusCode).json(error.message)
      return
    }

    this.logger.log(`Success to find a task by yser id`)

    res.status(HTTP_STATUS.OK).json(result.value)
    return
  }

  private checkError(error: Error): HttpDataResponse {
    if (error instanceof IdNotFound) {
      return {
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: error.message,
      }
    }

    return {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    }
  }
}
