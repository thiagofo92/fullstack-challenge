import { randomUUID } from 'crypto'
import { ArchiveTaskAppOutputDto } from 'src/app/dto'
import { ArchiveTaskEntity } from '../../../core/entities/archive-task.entity'
import { ArchiveTaskRepositoryPort } from 'src/infra/port'
import { Either, right } from '../../../shared/error/either'

export class ArchiveTaskMongooseRepository implements ArchiveTaskRepositoryPort {
  private readonly archiveTask: Array<ArchiveTaskEntity> = []
  async create(input: ArchiveTaskEntity): Promise<Either<Error, boolean>> {
    input.id = randomUUID()
    this.archiveTask.push(input)

    return right(true)
  }

  async findByUserId(idUser: string): Promise<Either<Error, ArchiveTaskAppOutputDto>> {
    const result = this.archiveTask.filter((item) => item.idUser === idUser)
    return right(result)
  }
}
