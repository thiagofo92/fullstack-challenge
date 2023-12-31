import { ArchiveTaskAppInputDto } from '../dto'
import { randomUUID } from 'crypto'
import { TaskStatus } from '../../core/entities/task.entity'
import { faker } from '@faker-js/faker'

export function ArchiveTaskUseCaseMock(idTask: string = randomUUID()): ArchiveTaskAppInputDto {
  return {
    idTask,
    idUser: randomUUID(),
    title: faker.commerce.product(),
    status: TaskStatus.DONE,
    description: faker.word.words(),
    endDate: faker.date.anytime(),
    dateArchived: faker.date.anytime(),
  }
}
