import { Injectable, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Category, CreateCategoryInput } from 'src/graphql.schema'
import { Model, Document } from 'mongoose'
import { GeneralError } from 'src/common/general-error'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<Category & Document>,
  ) {}

  async getAll(): Promise<Category[]> {
    try {
      return this.categoryModel.find()
    } catch (error) {
      throw new GeneralError({
        isPublic: false,
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    }
  }

  async create(args: CreateCategoryInput): Promise<Category> {
    try {
      const createdCategory = new this.categoryModel({
        ...args,
        createdDate: new Date(),
      })
      return createdCategory.save()
    } catch (error) {
      throw new GeneralError({
        isPublic: false,
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    }
  }
}
