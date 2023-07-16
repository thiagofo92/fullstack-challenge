import { describe, test, expect, jest } from '@jest/globals'
import { TaskMemoryRepository } from '../memory'
import { TaskRepositoryMock } from '../__mocks__/task.repository.mock'
import { TaskCreateAppDtoOutput } from '../../../app/dto/task.app.dto'
import { IdNotFound } from '../../../shared/error/not-found.error'
import { left, right } from '../../../shared/error/either'
import { TaskStatus } from '../../../core/entities/task.entity'

function FactoryRepository() {
  return new TaskMemoryRepository()
}

describe('# Task repository case', () => {
  test('Create a new task', async () => {
    const repository = FactoryRepository()
    const mock = TaskRepositoryMock()

    const taskCreated = await repository.create(mock)
    expect(taskCreated.value).toHaveProperty('id')
  })

  test('Error to create a new task', async () => {
    const repository = FactoryRepository()
    const mock = TaskRepositoryMock()

    jest.spyOn(repository, 'create').mockResolvedValueOnce(left(new Error('Teste error to create new task')))
    const taskCreated = await repository.create(mock)

    expect(taskCreated.value).toBeInstanceOf(Error)
  })

  test('Update a task by ID', async () => {
    const repository = FactoryRepository()
    const mock = TaskRepositoryMock()

    const taskCreated = await repository.create(mock)
    const value = taskCreated.value as TaskCreateAppDtoOutput
    mock.id = value.id
    const result = await repository.update(mock)

    expect(result.value).toStrictEqual(true)
  })

  test('Error to found ID for update', async () => {
    const repository = FactoryRepository()
    const mock = TaskRepositoryMock()

    const result = await repository.update(mock)
    expect(result.value).toBeInstanceOf(IdNotFound)
  })

  test('Error to update the task', async () => {
    const repository = FactoryRepository()
    const mock = TaskRepositoryMock()

    jest.spyOn(repository, 'update').mockResolvedValueOnce(right(false))

    const result = await repository.update(mock)
    expect(result.value).toStrictEqual(false)
  })

  test('Delete task by ID', async () => {
    const repository = FactoryRepository()
    const mock = TaskRepositoryMock()

    const taskCreated = await repository.create(mock)
    const value = taskCreated.value as TaskCreateAppDtoOutput
    const result = await repository.delete(value.id)

    expect(result.value).toStrictEqual(true)
  })

  test('Error to found ID for delete', async () => {
    const repository = FactoryRepository()

    const result = await repository.delete('')
    expect(result.value).toBeInstanceOf(IdNotFound)
  })

  test('Error to update the task', async () => {
    const repository = FactoryRepository()

    jest.spyOn(repository, 'delete').mockResolvedValueOnce(right(false))

    const result = await repository.delete('')
    expect(result.value).toStrictEqual(false)
  })

  test('Find all task from user using idUser', async () => {
    const repository = FactoryRepository()
    const mock = TaskRepositoryMock()

    await repository.create(mock)
    const result = await repository.findByUserId(mock.idUser)

    expect(result.value).not.toBeNull()
  })

  test('User dont has task', async () => {
    const repository = FactoryRepository()

    const result = await repository.findByUserId('')
    expect(result.value).toStrictEqual([])
  })

  test('Error to find the task by user ID', async () => {
    const repository = FactoryRepository()

    jest.spyOn(repository, 'findByUserId').mockResolvedValueOnce(left(new Error('Test - Error to find task')))

    const result = await repository.findByUserId('')
    expect(result.value).toBeInstanceOf(Error)
  })

  test('Filter the task from user by status', async () => {
    const repository = FactoryRepository()
    const mock = TaskRepositoryMock()

    await repository.create(mock)
    const result = await repository.filter(mock.idUser, TaskStatus.TODO)

    expect(result.value).not.toBeNull()
  })

  test('User dont has task - with inputed status', async () => {
    const repository = FactoryRepository()

    const result = await repository.filter('', '')
    expect(result.value).toStrictEqual([])
  })

  test('Error to filter the task by user ID', async () => {
    const repository = FactoryRepository()

    jest.spyOn(repository, 'filter').mockResolvedValueOnce(left(new Error('Test - Error to find task')))

    const result = await repository.filter('', '')
    expect(result.value).toBeInstanceOf(Error)
  })
})
