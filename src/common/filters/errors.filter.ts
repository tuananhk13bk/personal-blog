import {
  HttpException,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common'
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql'
import { GeneralError } from '../general-error'
import { getErrorMessageByStatus } from 'src/constants/error-messages.constant'

@Catch(GeneralError)
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: GeneralError, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host)
    if (exception.isPublic) {
      return exception
    }
    return new HttpException(
      getErrorMessageByStatus(exception.getStatus()),
      exception.getStatus(),
    )
  }
}
