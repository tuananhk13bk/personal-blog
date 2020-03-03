import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Inject,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Logger } from 'winston'
import { APP_LOGGER } from 'src/common/constants/providers.constant'
import { buildGraphqlSuccessLog } from 'src/utils/logger.util'

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(@Inject(APP_LOGGER) private readonly logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now()
    return next.handle().pipe(
      tap(() => {
        const logObject = buildGraphqlSuccessLog({
          context,
          receiveRequestTime: now,
        })
        this.logger.info(logObject)
      }),
    )
  }
}
