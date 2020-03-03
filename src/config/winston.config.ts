import { WinstonModuleOptions } from 'nest-winston'
import { transports, format } from 'winston'
import * as path from 'path'
import { GqlLogObject, LogSource } from 'src/common/types/logs.type'

const winstonConfig: WinstonModuleOptions = {
  exitOnError: false,
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf((info: GqlLogObject) => {
          if (info.logSource === LogSource.Resolver) {
            return `[${info.level}] ${info.timestamp} - ${info.ip} - ${info.queryString} - ${info.message} +${info.executionTime}`
          }
        }),
      ),
    }),
    new transports.File({
      level: 'error',
      filename: path.resolve(__dirname, '../../log/error.log'),
    }),
    new transports.File({
      level: 'info',
      filename: path.resolve(__dirname, '../../log/info.log'),
    }),
  ],
}

export default winstonConfig
