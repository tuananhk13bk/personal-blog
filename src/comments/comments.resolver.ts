import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { CommentsService } from './comments.service'
import { Comment, CreateCommentInput } from 'src/graphql.schema'
import { UsePipes } from '@nestjs/common'
import { CreatedDatePipe } from 'src/common/pipes/add-created-date.pipe'
import { InjectQueue } from '@nestjs/bull'
import { UserQueue } from 'src/common/constants/queues.constant'
import { Queue } from 'bull'

@Resolver('Comments')
export class CommentsResolver {
  constructor(
    private readonly commentService: CommentsService,
    @InjectQueue(UserQueue.NAME) private readonly userQueue: Queue,
  ) {}

  @Query('getAllComments')
  async getAll(): Promise<Comment[]> {
    return this.commentService.getAll()
  }

  @Mutation('createComment')
  @UsePipes(CreatedDatePipe)
  async create(
    @Args('createCommentInput') args: CreateCommentInput,
  ): Promise<Comment> {
    const createdComment = await this.commentService.create(args)

    await this.userQueue.add(UserQueue.ACTION.INCREASE_COMMENT_COUNT, {
      userId: args.author.id,
    })

    return createdComment
  }
}
