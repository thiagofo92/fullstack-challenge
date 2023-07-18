import { Module, Logger } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UserUseCasePort } from '../../../../../app/port'
import { UserMemoryRepository } from '../../../../../infra/repositories/memory'
import { UserUseCase } from '../../../../../app/usecase'
import { AuthModule } from '../../guard/auth.module'
import { UserRepositoryPort } from 'src/infra/port'

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [
    Logger,
    {
      provide: UserUseCasePort,
      useFactory: (logger, repository) => {
        return new UserUseCase(repository, logger)
      },
      inject: [Logger, UserRepositoryPort],
    },
    {
      provide: UserRepositoryPort,
      useClass: UserMemoryRepository,
    },
  ],
})
export class UsersModule {}
