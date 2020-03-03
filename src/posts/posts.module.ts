import { Module } from '@nestjs/common'
import { PostsService } from './posts.service'
import { PostsResolver } from './posts.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { PostsBucketSchema } from './schemas/post.schema'
import { PostsHelper } from './posts.helper'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Post', schema: PostsBucketSchema }]),
  ],
  providers: [PostsService, PostsResolver, PostsHelper],
})
export class PostsModule {}
