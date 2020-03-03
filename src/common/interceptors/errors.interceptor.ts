import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
  Inject,
} from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { APP_LOGGER } from 'src/common/constants/providers.constant'
import { Logger } from 'winston'
import { buildGraphqlErrorLog } from 'src/utils/logger.util'
import { GeneralError } from '../general-error'
@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  constructor(@Inject(APP_LOGGER) private readonly logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now()
    return next.handle().pipe(
      catchError((err: GeneralError) => {
        const logObject = buildGraphqlErrorLog({
          context,
          receiveRequestTime: now,
          error: err,
        })
        this.logger.error(logObject)
        return throwError(err)
      }),
    )
  }
}
