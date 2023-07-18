import Winston, { format, transports } from 'winston'

const path = __dirname
const logsFiles = [
  new transports.File({ dirname: path, filename: 'info.log' }),
  new transports.File({ dirname: path, filename: 'errors.log ', level: 'error' }),
]

const transportsOptions: Winston.transport[] = [new transports.Console(), ...logsFiles]

export const WinstonOptions: Winston.LoggerOptions = {
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: format.combine(format.json(), format.timestamp(), format.colorize({ all: true })),
  transports: transportsOptions,
  exceptionHandlers: [new transports.Console({ level: 'alert' })],
  rejectionHandlers: [new transports.Console({ level: 'alert' })],
}

// export const WinstonOptions = Winston.createLogger(options)
