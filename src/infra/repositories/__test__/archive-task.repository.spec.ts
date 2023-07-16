import { describe, jest, test, expect } from '@jest/globals'
import { ArchiveTaskRepositoryPort } from 'src/infra/port'
import { ArchiveTaskMemoryRepository } from '../memory'
import { ArchiveTaskRepositoryMock } from '../__mocks__'
import { left, right } from '../../../shared/error/either'

function FactoryRepository(): ArchiveTaskRepositoryPort {
  return new ArchiveTaskMemoryRepository()
}

describe('# Archive task case', () => {
  test('Create a new archive task', async () => {
    const repository = FactoryRepository()
    const mock = ArchiveTaskRepositoryMock()

    const result = await repository.create(mock)

    expect(result.value).toStrictEqual(true)
  })

  test('Error to create a archive task', async () => {
    const repository = FactoryRepository()
    const mock = ArchiveTaskRepositoryMock()

    jest.spyOn(repository, 'create').mockResolvedValueOnce(right(false))
    const result = await repository.create(mock)

    expect(result.value).toStrictEqual(false)
  })

  test('Find archive task by user ID', async () => {
    const repository = FactoryRepository()
    const mock = ArchiveTaskRepositoryMock()

    await repository.create(mock)
    const archive = await repository.findByUserId(mock.idUser)

    expect(archive.value).not.toBeNull()
  })

  test('Error to find a archive task', async () => {
    const repository = FactoryRepository()
    const mock = ArchiveTaskRepositoryMock()

    jest
      .spyOn(repository, 'findByUserId')
      .mockResolvedValueOnce(left(new Error('Test to find archive task by user id')))
    const result = await repository.findByUserId('')

    expect(result.value).toBeInstanceOf(Error)
  })
})
