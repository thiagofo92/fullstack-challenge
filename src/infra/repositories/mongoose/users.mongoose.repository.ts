import { UserAppCreatedOutPutDto } from '../../../app/dto'
import { UserEntity } from '../../../core/entities/user.entity'
import { UserRepositoryPort } from '../../port'
import { Either, left, right } from '../../../shared/error/either'
import { UserRepositoryFailAuth } from '../errors'
import { UserTasksMongooseModel } from './model'
export class UserMongooseRepository implements UserRepositoryPort {
  async create(input: UserEntity): Promise<Either<Error, UserAppCreatedOutPutDto>> {
    try {
      const user = await UserTasksMongooseModel.create({
        name: input.name,
        email: input.email,
        password: input.password,
        tasks: [],
      })
      return right({ id: user.id, name: input.name })
    } catch (error: any) {
      return left(error)
    }
  }

  async validate(
    email: string,
    password: string,
  ): Promise<Either<Error | UserRepositoryFailAuth, UserAppCreatedOutPutDto>> {
    try {
      const result = await UserTasksMongooseModel.findOne({
        email,
        password,
      })

      if (!result) return left(new UserRepositoryFailAuth())

      return right({ id: result.id, name: result.name })
    } catch (error) {
      return left(error)
    }
  }
}
