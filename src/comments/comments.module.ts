import { Module } from '@nestjs/common'
import { CommentsResolver } from './comments.resolver'
import { CommentsService } from './comments.service'
import { MongooseModule } from '@nestjs/mongoose'
import { CommentSchema } from './schemas/comment.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
  ],
  providers: [CommentsResolver, CommentsService],
})
export class CommentsModule {}
