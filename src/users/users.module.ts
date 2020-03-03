import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './schemas/users.schema'
import { IncreaseUserPostCountConsumer } from './increase-post-count.processor'
import { IncreaseUserCommentCountConsumer } from './increase-comment-count.processor'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  providers: [
    UsersService,
    UsersResolver,
    IncreaseUserPostCountConsumer,
    IncreaseUserCommentCountConsumer,
  ],
  exports: [UsersService],
})
export class UsersModule {}
