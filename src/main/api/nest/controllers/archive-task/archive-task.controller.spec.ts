import { Test, TestingModule } from '@nestjs/testing'
import { ArchiveTaskController } from './archive-task.controller'

describe.skip('ArchiveTaskController', () => {
  let controller: ArchiveTaskController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArchiveTaskController],
    }).compile()

    controller = module.get<ArchiveTaskController>(ArchiveTaskController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
