import { CacheInterceptor } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export class GqlCacheInterceptor extends CacheInterceptor {
  //   async intercept(context, next) {
  //     const key = this.trackBy(context);
  //     const ttl = this.reflector.get(cache_constants_1.CACHE_TTL_METADATA, context.getHandler()) || null;
  //     if (!key) {
  //         return next.handle();
  //     }
  //     try {
  //         const value = await this.cacheManager.get(key);
  //         if (value) {
  //             return rxjs_1.of(value);
  //         }
  //         return next.handle().pipe(operators_1.tap(response => {
  //             const args = ttl ? [key, response, { ttl }] : [key, response];
  //             this.cacheManager.set(...args);
  //         }));
  //     }
  //     catch (_a) {
  //         return next.handle();
  //     }
  // }
  trackBy(context) {
    const ctx = GqlExecutionContext.create(context)
    const httpAdapter = this.httpAdapterHost.httpAdapter
    const isHttpApp = httpAdapter && !!httpAdapter.getRequestMethod
    const cacheMetadata = this.reflector.get(
      // cache_constants_1.CACHE_KEY_METADATA,
      'cache_module:cache_key',
      context.getHandler(),
    )
    if (!isHttpApp || cacheMetadata) {
      return cacheMetadata
    }
    const request = context.getArgByIndex(0)
    if (httpAdapter.getRequestMethod(request) !== 'GET') {
      return undefined
    }
    return httpAdapter.getRequestUrl(request)
  }
}
