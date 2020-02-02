import { WinstonModuleOptions } from 'nest-winston'
import { transports, format } from 'winston'
import * as path from 'path'

const timestampFormat = { format: 'dd/MM/YYYY, hh:mm:ss' }

const winstonConfig: WinstonModuleOptions = {
  exitOnError: false,
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(timestampFormat),
        format.colorize(),
        format.printf(info => {
          return `[${info.level}] ${info.timestamp} - ${info.ip} - ${info.queryString} - ${info.message} +${info.executionTime}`
        }),
      ),
    }),
    new transports.File({
      format: format.combine(format.timestamp(timestampFormat), format.json()),
      level: 'error',
      filename: path.resolve(__dirname, '../../log/error.log'),
    }),
    new transports.File({
      format: format.combine(format.timestamp(timestampFormat), format.json()),
      level: 'info',
      filename: path.resolve(__dirname, '../../log/info.log'),
    }),
  ],
}

export default winstonConfig
