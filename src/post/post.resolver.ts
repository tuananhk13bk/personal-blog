import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { PostService } from './post.service'
import { CreatePostInput, Post } from 'src/graphql.schema'

@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query('getAllPost')
  async getAll(): Promise<Post[]> {
    return this.postService.getAll()
  }

  @Mutation('createPost')
  async create(@Args('createPostInput') args: CreatePostInput): Promise<Post> {
    const createdPost = await this.postService.create(args)
    // pubSub.publish('catCreated', { catCreated: createdCat });
    return createdPost
  }

  async update(@Args('updatePostInput') args) {}

  async delete(@Args('deletePostInput') args) {}
}
