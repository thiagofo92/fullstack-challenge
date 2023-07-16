import { TaskAppDtoInput } from '../dto'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'
import { TaskStatus } from '../../core/entities/task.entity'

export function TaskUseCaseMock(): TaskAppDtoInput {
  return {
    idUser: randomUUID(),
    title: faker.commerce.productName(),
    description: faker.word.words(),
    status: TaskStatus.TODO,
    endDate: faker.date.anytime(),
  }
}
