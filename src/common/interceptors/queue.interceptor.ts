import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'
import { tap } from 'rxjs/operators'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class QueueInterceptor implements NestInterceptor {
  constructor(
    private readonly queueInstance: Queue,
    private readonly actionName: string,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context)
    console.log(ctx.getArgs())
    return next.handle().pipe(tap(data => console.log(data)))
  }
}

//
// queueInstance
// actionName
// message
