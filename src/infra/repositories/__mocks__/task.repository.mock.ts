import { TaskEntity, TaskStatus } from '../../../core/entities/task.entity'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'
export function TaskRepositoryMock(idUser: string = randomUUID()): TaskEntity {
  return {
    idUser,
    title: faker.commerce.productName(),
    description: faker.word.words(),
    status: TaskStatus.TODO,
    endDate: faker.date.anytime(),
  }
}
