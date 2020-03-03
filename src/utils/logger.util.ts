import { ExecutionContext, HttpStatus } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { GeneralError } from 'src/common/general-error'
import * as moment from 'moment'
import * as _ from 'lodash'
import { LOG_DATE_FORMAT } from 'src/common/constants/commons.constant'
import { LogSource, GqlLogObject } from 'src/common/types/logs.type'
import { omitDeep } from './objects.util'

interface BuildGraphqlLogInput {
  context: ExecutionContext
  receiveRequestTime: number
  sensitiveFieldToRemove?: string[]
  error?: GeneralError
}

type LogLevel = 'error' | 'info'
type RequestStatus = 'success' | 'failed'
type GraphqlQueryType = 'Query' | 'Mutation'

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
  sensitiveFieldToRemove = ['password'],
  error = null,
}: BuildGraphqlLogInput): GqlLogObject => {
  const gqlCtx = GqlExecutionContext.create(context)
  const originalReq = gqlCtx.getContext().req
  const queryType = gqlCtx.getInfo().parentType
  // TODO: remove sensitive fields from request body (in nested object)
  const queryString = JSON.stringify(gqlCtx.getArgs())

  const executionTime = `${Date.now() - receiveRequestTime}ms`
  const requestStatus = mapLogLevelToRequestStatus[logLevel]

  return {
    level: logLevel,
    timestamp: moment().format(LOG_DATE_FORMAT),
    ip: originalReq.ip,
    queryString,
    queryType,
    message: buildLogMessage({ queryType, requestStatus, error }),
    executionTime,
    stack: error ? error.stack : '',
    logSource: LogSource.Resolver,
  }
}

const buildGraphqlSuccessLog = buildGraphqlLog('info')
const buildGraphqlErrorLog = buildGraphqlLog('error')

export { buildGraphqlSuccessLog, buildGraphqlErrorLog }
