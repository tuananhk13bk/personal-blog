import { AuthGuard } from '@nestjs/passport'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class GqlLocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const originalRequest = ctx.getContext().req
    const mutationParams = context.getArgs()[1].loginInput
    return {
      ...originalRequest,
      body: {
        ...originalRequest.body,
        ...mutationParams,
      },
    }
  }
}
