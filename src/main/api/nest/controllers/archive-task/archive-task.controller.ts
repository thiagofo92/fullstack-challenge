import { Controller, Post, Get, Body, Query, UseGuards, Res, Req, Logger } from '@nestjs/common'
import { ArchiveTaskUseCasePort } from 'src/app/port'
import { ArchiveTaskFindByUserIdValidationDto, ArchiveTaskValidationDto } from '../../validation-dto'
import { AuthGuard } from '../../guard/auth.guard'
import { HttpDataResponse } from 'src/main/api/util/http-data-response'
import { HTTP_STATUS } from 'src/main/api/util/http-status'
import { Request, Response } from 'express'
import { IdNotFound } from 'src/shared/error/not-found.error'

@Controller('archive-task')
@UseGuards(AuthGuard)
export class ArchiveTaskController {
  constructor(private readonly usecase: ArchiveTaskUseCasePort, private readonly logger: Logger) {}

  @Post()
  async create(@Req() req: Request, @Body() input: ArchiveTaskValidationDto, @Res() res: Response) {
    const user = req['user']
    this.logger.log(`User ID: ${user.sub} creating a new Archive task`)

    const result = await this.usecase.create(input.idTask)

    if (result.isLeft()) {
      const error = this.checkError(result.value)
      this.logger.error(`Error to create a archive task ${result.value}`)
      return res.status(error.statusCode).json(error.message)
    }

    this.logger.log(`Success to create a archive task`)
    return res.status(HTTP_STATUS.CREATED).json(result.value)
  }

  @Get()
  async findByUserId(
    @Req() req: Request,
    @Query() { idUser }: ArchiveTaskFindByUserIdValidationDto,
    @Res() res: Response,
  ) {
    const user = req['user']
    this.logger.log(`User ID: ${user.sub} find the archives by ID`)
    const result = await this.usecase.findByUserId(idUser)

    if (result.isLeft()) {
      const error = this.checkError(result.value)
      this.logger.error(`Error to find all archive task by user ID message: ${result.value}`)
      return res.status(error.statusCode).json(error.message)
    }
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
