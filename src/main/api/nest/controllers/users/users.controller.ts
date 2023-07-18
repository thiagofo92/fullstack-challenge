import { Body, Controller, Post, Res, HttpCode, Logger, InternalServerErrorException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'
import { UserUseCasePort } from '../../../../../app/port'
import { UserAuthValidationDto, UserValidationDto } from '../../validation-dto'
import { HTTP_STATUS } from '../../../util/http-status'
import { HttpDataResponse } from '../../../util/http-data-response'
import { UserRepositoryFailAuth } from '../../../../../infra/repositories/errors'

@Controller('users')
export class UsersController {
  private readonly secretJwt = process.env.TOKEN_JWT

  constructor(
    private readonly usecase: UserUseCasePort,
    private readonly jwt: JwtService,
    private readonly logger: Logger,
  ) {}

  @Post()
  async create(@Body() userDto: UserValidationDto, @Res() res: Response) {
    this.logger.log(`Start to create a new user: ${userDto.name}`)
    const result = await this.usecase.create(userDto)

    if (result.isLeft()) {
      this.logger.error(`Error to create a user message: ${result.value.message}`)
      const error = this.checkError(result.value)
      return res.status(error.statusCode).json(error.message)
    }

    try {
      const payload = { sub: result.value.id, username: result.value.name }
      const token = await this.jwt.signAsync(payload, { secret: this.secretJwt })
      return res.status(HTTP_STATUS.OK).json({ token })
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException()
    }
  }

  @Post('/validation')
  @HttpCode(200)
  async validation(@Body() { email, password }: UserAuthValidationDto, @Res() res: Response) {
    this.logger.log(`Start to auth the user`)
    const result = await this.usecase.validate(email, password)

    if (result.isLeft()) {
      const error = this.checkError(result.value)
      return res.status(error.statusCode).json(error.message)
    }

    try {
      const payload = { sub: result.value.id, username: result.value.name }
      const token = await this.jwt.signAsync(payload, { secret: this.secretJwt })
      return res.status(HTTP_STATUS.OK).json({ token })
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException()
    }
  }

  private checkError(error: Error): HttpDataResponse {
    if (error instanceof UserRepositoryFailAuth) {
      return {
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: 'Wrong email or password',
      }
    }

    return {
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    }
  }
}
