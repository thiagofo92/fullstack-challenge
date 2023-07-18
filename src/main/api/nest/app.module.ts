import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { UsersModule } from './controllers/users/users.module'
import { TasksModule } from './controllers/tasks/tasks.module'
import { ArchiveTaskModule } from './controllers/archive-task/archive-task.module'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core/constants'

@Module({
  imports: [
    UsersModule,
    TasksModule,
    ArchiveTaskModule,
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 15,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
