import {
  Injectable,
  CacheOptionsFactory,
  CacheModuleOptions,
} from '@nestjs/common'
import * as redisStore from 'cache-manager-redis-store'

@Injectable()
class RedisConfigService implements CacheOptionsFactory {
  createCacheOptions(): CacheModuleOptions {
    return {
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      ttl: 10,
      max: 10,
    }
  }
}

export default RedisConfigService
