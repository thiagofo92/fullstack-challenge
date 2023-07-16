import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'
import { ArchiveTaskEntity } from '../../../core/entities/archive-task.entity'
import { TaskStatus } from '../../../core/entities/task.entity'

export function ArchiveTaskRepositoryMock(): ArchiveTaskEntity {
  return {
    idUser: randomUUID(),
    title: faker.commerce.product(),
    status: TaskStatus.DONE,
    description: faker.word.words(),
    endDate: faker.date.anytime(),
    dateArchived: faker.date.anytime(),
  }
}
