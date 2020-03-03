import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { CategoriesService } from './categories.service'
import { Category, CreateCategoryInput } from 'src/graphql.schema'
import { UsePipes, UseFilters } from '@nestjs/common'
import { JoiValidationPipe } from 'src/common/pipes/validation.pipe'
import { createCategorySchema } from './schemas/category.validation'
import { HttpExceptionFilter } from 'src/common/filters/errors.filter'

@Resolver('Category')
@UseFilters(HttpExceptionFilter)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query('getAllCategories')
  async getAll(): Promise<Category[]> {
    return this.categoriesService.getAll()
  }

  @Mutation('createCategory')
  @UsePipes(new JoiValidationPipe(createCategorySchema))
  async create(
    @Args('createCategoryInput') args: CreateCategoryInput,
  ): Promise<Category> {
    return this.categoriesService.create(args)
  }
}
