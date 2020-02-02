declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string
    MONGO_URI: string
    MONGO_URI_LOCAL: string
    REDIS_HOST: string
    REDIS_PORT: string
  }
}
