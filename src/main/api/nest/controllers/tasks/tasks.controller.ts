import { Controller, Post, Body, Put, Delete, Query, Get, UseGuards, Req, Logger, Res } from '@nestjs/common'
import { TaskUseCasePort } from 'src/app/port'
import {
  TaskCreateValidationDto,
  TaskFilterValidation,
  TaskIdValidation,
  TaskUpdateValidationDto,
  TaskUserIDValidation,
} from '../../validation-dto'
import { AuthGuard } from '../../guard/auth.guard'
import { Request, Response } from 'express'
import { HttpDataResponse } from 'src/main/api/util/http-data-response'
import { HTTP_STATUS } from 'src/main/api/util/http-status'
import { IdNotFound } from 'src/shared/error/not-found.error'

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly usecase: TaskUseCasePort, private readonly logger: Logger) {}

  @Post()
  async create(@Body() input: TaskCreateValidationDto, @Req() req: Request, @Res() res: Response) {
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
  async update(@Body() input: TaskUpdateValidationDto, @Req() req: Request, @Res() res: Response) {
    const user = req['user']
    this.logger.log(`User start to update the task user ID: ${user.sub}`)
    const result = await this.usecase.update(input)

    if (result.isLeft()) {
      const error = this.checkError(result.value)
      this.logger.error(`Error to update the user task message: ${result.value}`)
      return res.status(error.statusCode).json(error.message)
    }

    this.logger.log(`Success to update user task`)
    return res.status(HTTP_STATUS.OK).json(result.value)
  }

  @Delete()
  async delete(@Query() { id }: TaskIdValidation, @Req() req: Request, @Res() res: Response) {
    const payload = req['user']
    this.logger.log(`User ID:${payload.sub}, delete a task`)
    const result = await this.usecase.delete(id)

    if (result.isLeft()) {
      const error = this.checkError(result.value)
      this.logger.error(`Error to delete the user task message: ${result.value}`)
      return res.status(error.statusCode).json(error.message)
    }

    this.logger.log(`Success to delete the user task`)
    return res.status(HTTP_STATUS.OK).json(result.value)
  }

  @Get('/filter')
  async filter(@Query() { idUser, status }: TaskFilterValidation, @Req() req: Request, @Res() res: Response) {
    const payload = req['user']
    this.logger.log(`User ID:${payload.sub}, filter a task by status: ${status}`)
    const result = await this.usecase.filter(idUser, status)

    if (result.isLeft()) {
      const error = this.checkError(result.value)
      this.logger.error(`Error to delete the user task message: ${result.value}`)
      return res.status(error.statusCode).json(error.message)
    }
    this.logger.log(`Success to filter the status ${status}`)

    return res.status(HTTP_STATUS.OK).json(result.value)
  }

  @Get('/all')
  async findByUserId(@Query() { idUser }: TaskUserIDValidation, @Req() req: Request, @Res() res: Response) {
    const payload = req['user']
    this.logger.log(`User ID:${payload.sub}, find a task by user ID`)
    const result = await this.usecase.findByUserId(idUser)

    if (result.isLeft()) {
      const error = this.checkError(result.value)
      this.logger.error(`Error to find a taks by user ID message: ${result.value}`)
      return res.status(error.statusCode).json(error.message)
    }

    this.logger.log(`Success to find a task by yser id`)

    return res.status(HTTP_STATUS.OK).json(result.value)
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
