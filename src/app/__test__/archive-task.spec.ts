import { describe, jest, test, expect } from '@jest/globals'
import { ArchiveTaskMemoryRepository, TaskMemoryRepository } from '../../infra/repositories/memory'
import { ArchiveTaskUseCaseMock } from '../__mocks__/archive-task.usecase.mock'
import { left, right } from '../../shared/error/either'
import { ArchiveTaskUseCase } from '../usecase'
import { TaskRepositoryMock } from '../../infra/repositories/__mocks__/task.repository.mock'
import { TaskAppDtoOutput } from '../dto'
import { IdNotFound } from '../../shared/error/not-found.error'

function FactoryUseCase() {
  const repositoryArchive = new ArchiveTaskMemoryRepository()
  const repositoryTask = new TaskMemoryRepository()
  const usecase = new ArchiveTaskUseCase(repositoryArchive, repositoryTask)
  return { usecase, repositoryArchive, repositoryTask }
}

describe('# Archive task usecase - test case', () => {
  test('Create a new archive task', async () => {
    const { usecase, repositoryTask } = FactoryUseCase()
    const taskMock = TaskRepositoryMock()

    const task = await repositoryTask.create(taskMock)
    const value = task.value as TaskAppDtoOutput
    const result = await usecase.create(value.id)

    expect(result.value).toStrictEqual(true)
  })

  test('Error to find Task id not found', async () => {
    const { usecase, repositoryArchive } = FactoryUseCase()

    jest.spyOn(repositoryArchive, 'create').mockResolvedValueOnce(right(false))
    const result = await usecase.create('')

    expect(result.value).toBeInstanceOf(IdNotFound)
  })

  test('Error to create archive task', async () => {
    const { usecase, repositoryTask, repositoryArchive } = FactoryUseCase()
    jest.spyOn(repositoryTask, 'delete').mockResolvedValueOnce(right({} as any))

    jest.spyOn(repositoryArchive, 'create').mockResolvedValueOnce(right(false))
    const result = await usecase.create('')

    expect(result.value).toStrictEqual(false)
  })

  test('Find archive task by user ID', async () => {
    const { usecase, repositoryTask } = FactoryUseCase()
    const mock = ArchiveTaskUseCaseMock()
    const taskMock = TaskRepositoryMock()

    const task = await repositoryTask.create(taskMock)
    const value = task.value as TaskAppDtoOutput
    await usecase.create(value.id)
    const archive = await usecase.findByUserId(mock.idUser)

    expect(archive.value).not.toBeNull()
  })

  test('Error to find a archive task', async () => {
    const { usecase, repositoryArchive } = FactoryUseCase()

    jest
      .spyOn(repositoryArchive, 'findByUserId')
      .mockResolvedValueOnce(left(new Error('Test to find archive task by user id')))
    const result = await usecase.findByUserId('')

    expect(result.value).toBeInstanceOf(Error)
  })
})
