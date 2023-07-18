import { describe, test, expect, jest } from '@jest/globals'
import { TaskMemoryRepository } from '../../infra/repositories/memory/task.memory.repository'
import { TaskUseCaseMock } from '../__mocks__/task.usecase.mock'
import { IdNotFound } from '../../shared/error/not-found.error'
import { left, right } from '../../shared/error/either'
import { TaskStatus } from '../../core/entities/task.entity'
import { TaskCreateAppDtoOutput } from '../dto'
import { TaskUseCase } from '../usecase'
import { LoggerMock } from '../__mocks__/logger.usecase.mock'

function FactoryUseCase() {
  const repository = new TaskMemoryRepository()
  const usecase = new TaskUseCase(repository, LoggerMock)
  return { usecase, repository }
}

describe('# Task UseCase - Test case', () => {
  test('Create a new task', async () => {
    const { usecase } = FactoryUseCase()
    const mock = TaskUseCaseMock()

    const taskCreated = await usecase.create(mock)
    expect(taskCreated.value).toHaveProperty('id')
  })

  test('Error to create a new task', async () => {
    const { usecase, repository } = FactoryUseCase()
    const mock = TaskUseCaseMock()

    jest.spyOn(repository, 'create').mockResolvedValueOnce(left(new Error('Teste error to create new task')))
    const taskCreated = await usecase.create(mock)

    expect(taskCreated.value).toBeInstanceOf(Error)
  })

  test('Update a task by ID', async () => {
    const { usecase } = FactoryUseCase()
    const mock = TaskUseCaseMock()

    const taskCreated = await usecase.create(mock)
    const value = taskCreated.value as TaskCreateAppDtoOutput
    mock.id = value.id
    const result = await usecase.update(mock)

    expect(result.value).toStrictEqual(true)
  })

  test('Error to found ID for update', async () => {
    const { usecase } = FactoryUseCase()
    const mock = TaskUseCaseMock()

    const result = await usecase.update(mock)
    expect(result.value).toBeInstanceOf(IdNotFound)
  })

  test('Error to update the task', async () => {
    const { usecase, repository } = FactoryUseCase()
    const mock = TaskUseCaseMock()

    jest.spyOn(repository, 'update').mockResolvedValueOnce(right(false))

    const result = await usecase.update(mock)
    expect(result.value).toStrictEqual(false)
  })

  test('Delete task by ID', async () => {
    const { usecase } = FactoryUseCase()
    const mock = TaskUseCaseMock()

    const taskCreated = await usecase.create(mock)
    const value = taskCreated.value as TaskCreateAppDtoOutput
    const result = await usecase.delete(value.id)

    expect(result.value).toStrictEqual(mock)
  })

  test('Error to found ID for delete', async () => {
    const { usecase } = FactoryUseCase()

    const result = await usecase.delete('')
    expect(result.value).toBeInstanceOf(IdNotFound)
  })

  test('Error to update the task', async () => {
    const { usecase, repository } = FactoryUseCase()

    jest.spyOn(repository, 'delete').mockResolvedValueOnce(left(new Error('Test delte the task')))

    const result = await usecase.delete('')
    expect(result.value).toBeInstanceOf(Error)
  })

  test('Find all task from user using idUser', async () => {
    const { usecase } = FactoryUseCase()
    const mock = TaskUseCaseMock()

    await usecase.create(mock)
    const result = await usecase.findByUserId(mock.idUser)

    expect(result.value).not.toBeNull()
  })

  test('User dont has task', async () => {
    const { usecase } = FactoryUseCase()

    const result = await usecase.findByUserId('')
    expect(result.value).toStrictEqual([])
  })

  test('Error to find the task by user ID', async () => {
    const { usecase, repository } = FactoryUseCase()

    jest.spyOn(repository, 'findByUserId').mockResolvedValueOnce(left(new Error('Test - Error to find task')))

    const result = await usecase.findByUserId('')
    expect(result.value).toBeInstanceOf(Error)
  })

  test('Filter the task from user by status', async () => {
    const { usecase } = FactoryUseCase()
    const mock = TaskUseCaseMock()

    await usecase.create(mock)
    const result = await usecase.filter(mock.idUser, TaskStatus.TODO)

    expect(result.value).not.toBeNull()
  })

  test('User dont has task - with inputed status', async () => {
    const { usecase } = FactoryUseCase()

    const result = await usecase.filter('', '')
    expect(result.value).toStrictEqual([])
  })

  test('Error to filter the task by user ID', async () => {
    const { usecase, repository } = FactoryUseCase()

    jest.spyOn(repository, 'filter').mockResolvedValueOnce(left(new Error('Test - Error to find task')))

    const result = await usecase.filter('', '')
    expect(result.value).toBeInstanceOf(Error)
  })
})
