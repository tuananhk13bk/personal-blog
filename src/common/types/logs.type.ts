export enum LogSource {
  Resolver,
  Queue,
}

export interface GqlLogObject {
  level: string
  timestamp: string
  ip: string
  queryString: string
  queryType: string
  message: string
  executionTime: string
  stack?: string
  logSource: LogSource
}
