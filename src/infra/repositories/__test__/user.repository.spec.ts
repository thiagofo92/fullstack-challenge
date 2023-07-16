import { describe, test, jest, expect } from '@jest/globals'
import { UserMemoryRepository } from '../memory/user.memroy.repository'
import { UserRepositoryPort } from 'src/infra/port'
import { UserRepositoryFailAuth } from '../errors'
import { UserRepositoryMock } from '../__mocks__'
import { left } from '../../../shared/error/either'

function FactoryRepository(): UserRepositoryPort {
  return new UserMemoryRepository()
}

describe('# User repository case', () => {
  test('Create a new user', async () => {
    const repository = FactoryRepository()
    const userMock = UserRepositoryMock()

    const userCreated = await repository.create(userMock)
    const validated = await repository.validate(userMock.email, userMock.password)

    expect(validated.value).not.toBeInstanceOf(UserRepositoryFailAuth)
    expect(userCreated.value).toStrictEqual(validated.value)
  })

  test('Authentication fail', async () => {
    const repository = FactoryRepository()
    const userMock = UserRepositoryMock()

    jest.spyOn(repository, 'validate').mockResolvedValueOnce(left(new UserRepositoryFailAuth()))

    await repository.create(userMock)
    const validated = await repository.validate(userMock.email, userMock.password)

    expect(validated.value).toBeInstanceOf(UserRepositoryFailAuth)
  })
})
