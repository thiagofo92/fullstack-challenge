import { Module, Logger } from '@nestjs/common'
import { ArchiveTaskController } from './archive-task.controller'
import { ArchiveTaskUseCasePort } from '../../../../../app/port'
import { ArchiveTaskMemoryRepository, TaskMemoryRepository } from '../../../../../infra/repositories/memory'
import { ArchiveTaskUseCase } from '../../../../../app/usecase'
import { ArchiveTaskRepositoryPort, TaskRepositoryPort } from '../../../../../infra/port'

@Module({
  controllers: [ArchiveTaskController],
  providers: [
    Logger,
    {
      provide: ArchiveTaskUseCasePort,
      useFactory: (repArchive, repTask, logger) => {
        return new ArchiveTaskUseCase(repArchive, repTask, logger)
      },
      inject: [ArchiveTaskRepositoryPort, TaskRepositoryPort, Logger],
    },
    {
      provide: ArchiveTaskRepositoryPort,
      useClass: ArchiveTaskMemoryRepository,
    },
    {
      provide: TaskRepositoryPort,
      useClass: TaskMemoryRepository,
    },
  ],
})
export class ArchiveTaskModule {}
