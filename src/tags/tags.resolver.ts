import { Resolver, Args, Query, Mutation } from '@nestjs/graphql'
import { TagsService } from './tags.service'
import {
  Tag,
  CreateTagInput,
  MutationSuccessResponse,
  GetAllTagsInput,
} from 'src/graphql.schema'
import { UsePipes } from '@nestjs/common'
import { JoiValidationPipe } from 'src/common/pipes/validation.pipe'
import {
  CreateTagValidationSchema,
  GetAllTagsValidationSchema,
} from './schemas/tag.validation'
import { CreatedDatePipe } from 'src/common/pipes/add-created-date.pipe'
import { TagsInjectString } from './tags.constant'

@Resolver(TagsInjectString.RESOLVER)
export class TagsResolver {
  constructor(private readonly tagService: TagsService) {}

  @UsePipes(new JoiValidationPipe(GetAllTagsValidationSchema))
  @Query(TagsInjectString.QUERIES.GET_ALL_TAGS)
  async getAll(
    @Args(TagsInjectString.ARGUMENTS.GET_ALL_TAGS_INPUT) args: GetAllTagsInput,
  ): Promise<Tag[]> {
    return this.tagService.getAll(args)
  }

  @UsePipes(CreatedDatePipe)
  @UsePipes(new JoiValidationPipe(CreateTagValidationSchema))
  @Mutation(TagsInjectString.MUTATION.CREATE_TAG)
  async create(
    @Args(TagsInjectString.ARGUMENTS.CREATE_TAG_INPUT) args: CreateTagInput,
  ): Promise<MutationSuccessResponse> {
    return this.tagService.create(args)
  }
}
