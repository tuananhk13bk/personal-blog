import { Injectable, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Document } from 'mongoose'
import { Tag, CreateTagInput } from 'src/graphql.schema'
import { GeneralError } from 'src/common/general-error'

@Injectable()
export class TagsService {
  constructor(
    @InjectModel('Tag') private readonly tagModel: Model<Tag & Document>,
  ) {}

  async getAll(): Promise<Tag[]> {
    try {
      return this.tagModel.find()
    } catch (error) {
      throw new GeneralError({
        isPublic: false,
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    }
  }

  async create(args: CreateTagInput): Promise<Tag> {
    try {
      const createdTag = new this.tagModel({
        ...args,
        createdDate: new Date(),
      })
      return createdTag.save()
    } catch (error) {
      throw new GeneralError({
        isPublic: false,
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    }
  }
}
