import { Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostResolver } from './post.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { PostSchema } from './schemas/post.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }])],
  providers: [PostService, PostResolver],
})
export class PostModule {}
