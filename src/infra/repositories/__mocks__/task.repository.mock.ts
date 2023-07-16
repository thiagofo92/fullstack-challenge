import { TaskEntity, TaskStatus } from 'src/core/entities/task.entity'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'
export function TaskRepositoryMock(): TaskEntity {
  return {
    idUser: randomUUID(),
    title: faker.commerce.productName(),
    description: faker.word.words(),
    status: TaskStatus.TODO,
    endDate: faker.date.anytime(),
  }
}
