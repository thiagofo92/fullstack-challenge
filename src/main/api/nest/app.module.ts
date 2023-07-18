import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { UsersModule } from './controllers/users/users.module'
import { TasksModule } from './controllers/tasks/tasks.module'
import { ArchiveTaskModule } from './controllers/archive-task/archive-task.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [UsersModule, TasksModule, ArchiveTaskModule, ConfigModule.forRoot()],
  controllers: [AppController],
})
export class AppModule {}
