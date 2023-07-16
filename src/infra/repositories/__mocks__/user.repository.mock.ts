import { UserEntity } from 'src/core/entities/user.entity'
import { faker } from '@faker-js/faker'

export function UserRepositoryMock(): UserEntity {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
}
