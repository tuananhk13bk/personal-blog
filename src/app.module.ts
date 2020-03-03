import { Module, CacheModule, CacheInterceptor } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql'
import { PostsModule } from './posts/posts.module'
import { CategoriesModule } from './categories/categories.module'
import { WinstonModule } from 'nest-winston'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { AppController } from './app.controller'
import MongooseConfigService from './config/mongo.config'
import RedisConfigService from './config/redis.config'
import { BullModule } from '@nestjs/bull'
import { BullConfigService } from './config/bull.config'
import winstonConfig from './config/winston.config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { LoggerInterceptor } from './common/interceptors/logger.interceptor'
import { ErrorsInterceptor } from './common/interceptors/errors.interceptor'
import { TagsModule } from './tags/tags.module'
import { CommentsModule } from './comments/comments.module'
import { UserQueue } from './common/constants/queues.constant'
import { GqlCacheInterceptor } from './common/interceptors/gql-cache.interceptor'
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    BullModule.registerQueueAsync({
      name: UserQueue.NAME,
      useClass: BullConfigService,
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    CacheModule.registerAsync({ useClass: RedisConfigService }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      context: ({ req }) => ({ req }),
      debug: true,
    }),
    WinstonModule.forRoot(winstonConfig),
    PostsModule,
    CategoriesModule,
    AuthModule,
    UsersModule,
    TagsModule,
    CommentsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
