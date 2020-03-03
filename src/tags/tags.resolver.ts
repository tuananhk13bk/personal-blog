import { Resolver, Args, Query, Mutation } from '@nestjs/graphql'
import { TagsService } from './tags.service'
import { Tag, CreateTagInput } from 'src/graphql.schema'
import { UsePipes } from '@nestjs/common'
import { JoiValidationPipe } from 'src/common/pipes/validation.pipe'
import { TagValidationSchema } from './schemas/tag.validation'

@Resolver('Tags')
export class TagsResolver {
  constructor(private readonly tagService: TagsService) {}

  @Query('getAllTags')
  async getAll(): Promise<Tag[]> {
    return this.tagService.getAll()
  }

  @UsePipes(new JoiValidationPipe(TagValidationSchema))
  @Mutation('createTag')
  async create(@Args('createTagInput') args: CreateTagInput): Promise<Tag> {
    return this.tagService.create(args)
  }
}
