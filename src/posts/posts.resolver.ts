import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { PostsService } from './posts.service'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import {
  CreatePostInput,
  GetAllPostsInput,
  MutationSuccessResponse,
  PostsResponse,
} from 'src/graphql.schema'
import { UserQueue } from 'src/common/constants/queues.constant'
import { UsePipes } from '@nestjs/common'
import { CreatedDatePipe } from 'src/common/pipes/add-created-date.pipe'
import { JoiValidationPipe } from 'src/common/pipes/validation.pipe'
import {
  CreatePostValidationSchema,
  GetAllPostsValidationSchema,
} from './schemas/post.validation'
import { PostsInjectString } from './posts.constant'

@Resolver(PostsInjectString.RESOLVER)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    @InjectQueue(UserQueue.NAME) private readonly userQueue: Queue,
  ) {}

  @UsePipes(new JoiValidationPipe(GetAllPostsValidationSchema))
  @Query('getAllPosts')
  async getAll(
    @Args('getAllPostsInput') args: GetAllPostsInput,
  ): Promise<PostsResponse> {
    return this.postsService.getAll(args)
  }

  @UsePipes(CreatedDatePipe)
  @UsePipes(new JoiValidationPipe(CreatePostValidationSchema))
  @Mutation(PostsInjectString.MUTATIONS.CREATE_POST)
  async create(
    @Args(PostsInjectString.ARGUMENTS.CREATE_POST_INPUT) args: CreatePostInput,
  ): Promise<MutationSuccessResponse> {
    await this.userQueue.add(UserQueue.ACTION.INCREASE_POST_COUNT, {
      userId: args.author.id,
    })
    return this.postsService.create(args)
    // pubSub.publish('catCreated', { catCreated: createdCat });
  }

  async update(@Args('updatePostInput') args) {}

  @Mutation('deletePost')
  async delete(@Args('id') id) {
    return this.postsService.delete(id)
  }
}
