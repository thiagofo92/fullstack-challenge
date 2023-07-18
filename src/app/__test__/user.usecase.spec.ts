import { describe, test, expect, jest } from '@jest/globals'
import { UserMemoryRepository } from '../../infra/repositories/memory/user.memroy.repository'
import { UserUseCase } from '../usecase'
import { UserUseCaseMock } from '../__mocks__/user.usecase.mock'
import { left } from '../../shared/error/either'
import { UserRepositoryFailAuth } from '../../infra/repositories/errors'
import { LoggerMock } from '../__mocks__/logger.usecase.mock'

function FactoryUsecase() {
  const repository = new UserMemoryRepository()
  const usecase = new UserUseCase(repository, LoggerMock)
  return { repository, usecase }
}

describe('# User usecase - case test', () => {
  test('Create a new user', async () => {
    const { usecase } = FactoryUsecase()
    const mock = UserUseCaseMock()

    const result = await usecase.create(mock)

    expect(result.value).toHaveProperty('id')
    expect(result.value.name).toStrictEqual(mock.name)
  })

  test('Error to create a new user', async () => {
    const { usecase, repository } = FactoryUsecase()
    const mock = UserUseCaseMock()

    jest.spyOn(repository, 'create').mockResolvedValueOnce(left(new Error('Test error to create a new user')))
    const result = await usecase.create(mock)

    expect(result.value).toBeInstanceOf(Error)
  })

  test('Vallidate email and password', async () => {
    const { usecase } = FactoryUsecase()
    const mock = UserUseCaseMock()

    const user = await usecase.create(mock)
    const result = await usecase.validate(mock.email, mock.password)
    expect(result.value).toStrictEqual(user.value)
  })

  test('Fail to authenticate the user', async () => {
    const { usecase } = FactoryUsecase()
    const mock = UserUseCaseMock()

    const result = await usecase.validate(mock.email, mock.password)

    expect(result.value).toBeInstanceOf(UserRepositoryFailAuth)
  })

  test('Error to validate the user', async () => {
    const { usecase, repository } = FactoryUsecase()
    const mock = UserUseCaseMock()

    jest.spyOn(repository, 'validate').mockResolvedValueOnce(left(new Error('Test to validate the user')))
    const result = await usecase.validate(mock.email, mock.password)

    expect(result.value).toBeInstanceOf(Error)
  })
})
