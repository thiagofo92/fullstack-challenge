import { Logger, Module } from '@nestjs/common'
import { TasksController } from './tasks.controller'
import { TaskUseCasePort } from '../../../../../app/port'
import { TaskMemoryRepository } from '../../../../../infra/repositories/memory'
import { TaskRepositoryPort } from '../../../../../infra/port/task.repository.port'
import { TaskUseCase } from '../../../../../app/usecase'

@Module({
  controllers: [TasksController],
  providers: [
    Logger,
    {
      provide: TaskUseCasePort,
      useFactory: (repository, logger) => {
        return new TaskUseCase(repository, logger)
      },
      inject: [TaskRepositoryPort, Logger],
    },
    {
      provide: TaskRepositoryPort,
      useClass: TaskMemoryRepository,
    },
  ],
})
export class TasksModule {}
