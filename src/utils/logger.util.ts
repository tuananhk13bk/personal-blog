import { ExecutionContext, HttpStatus } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { GeneralError } from 'src/common/general-error'

interface BuildGraphqlLogInput {
  context: ExecutionContext
  receiveRequestTime: number
  error?: GeneralError
}

type LogLevel = 'error' | 'info'
type RequestStatus = 'success' | 'failed'
type GraphqlQueryType = 'Query' | 'Mutation'

interface LogOutput {
  message: string
  metadata: {
    ip: string
    queryString: string
    executionTime: string
    queryType: string
    stack?: string
  }
}

const mapLogLevelToRequestStatus: { [key in LogLevel]: RequestStatus } = {
  error: 'failed',
  info: 'success',
}

const mapStatusCodeToDefaultMessage: { [key in HttpStatus]?: string } = {
  [HttpStatus.BAD_REQUEST]: 'Bad Request',
  [HttpStatus.INTERNAL_SERVER_ERROR]:
    'There has been an error. Please try again later',
}

const buildLogMessage = ({
  queryType,
  requestStatus,
  error,
}: {
  queryType: GraphqlQueryType
  requestStatus: RequestStatus
  error: GeneralError
}) => {
  if (!error) {
    return `${queryType} ${requestStatus}`
  }

  return `${queryType} ${requestStatus}: ${error.message}`
}

const buildGraphqlLog = (logLevel: LogLevel) => ({
  context,
  receiveRequestTime,
  error,
}: BuildGraphqlLogInput): LogOutput => {
  const gqlCtx = GqlExecutionContext.create(context)
  const originalReq = gqlCtx.getContext().req
  const queryType = gqlCtx.getInfo().parentType
  const queryString = JSON.stringify(originalReq.body.query)

  const executionTime = `${Date.now() - receiveRequestTime}ms`
  const requestStatus = mapLogLevelToRequestStatus[logLevel]

  return {
    message: buildLogMessage({ queryType, requestStatus, error }),
    metadata: {
      ip: originalReq.ip,
      queryString,
      executionTime,
      queryType,
      stack: error ? error.stack : null,
    },
  }
}

const buildGraphqlSuccessLog = buildGraphqlLog('info')
const buildGraphqlErrorLog = buildGraphqlLog('error')

export { buildGraphqlSuccessLog, buildGraphqlErrorLog }
