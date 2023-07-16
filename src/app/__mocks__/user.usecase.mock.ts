import { UserAppInPutDto } from '../dto'
import { faker } from '@faker-js/faker'

export function UserUseCaseMock(): UserAppInPutDto {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
}
