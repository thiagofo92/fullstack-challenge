import { otelSDK } from '../util/open-telemetry'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { WinstonOptions } from '../../../shared/logger/logger'
import { WinstonModule } from 'nest-winston'
import { Connection } from '../../../infra/repositories/mongoose/connection/connection'
import helmet from 'helmet'

const logger = WinstonModule.createLogger(WinstonOptions)

export async function bootstrap() {
  otelSDK.start()

  const app = await NestFactory.create(AppModule, {
    logger,
  })

  app.use(helmet())
  app.useGlobalPipes(new ValidationPipe())

  process.on('SIGTERM', onSigterm)

  await app.listen(3000)
}

function onSigterm() {
  logger.warn('Server was shutdonw')

  Promise.allSettled([Connection.closeConnection, otelSDK.shutdown])
    .then(([connection, otl]) => {
      if (connection.status == 'rejected') logger.error('Databse connection shutdown fail')
      else logger.log('Success to close database connection')

      if (otl.status === 'rejected') logger.error('Failt o shutdown the Open telemetry')
      else logger.log('Success to shuwtdown open telemetry')
    })
    .catch((error) => {
      logger.error(error)
    })
    .finally(() => {
      process.exit(0)
    })
}
