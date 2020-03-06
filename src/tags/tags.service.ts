import { Injectable, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Document } from 'mongoose'
import {
  Tag,
  CreateTagInput,
  MutationSuccessResponse,
  RequestStatus,
  GetAllTagsInput,
} from 'src/graphql.schema'
import { GeneralError } from 'src/common/general-error'
import { CREATE_TAG_SUCCESS_MESSAGE, TagsInjectString } from './tags.constant'

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(TagsInjectString.MODEL)
    private readonly tagModel: Model<Tag & Document>,
  ) {}

  async getAll(args: GetAllTagsInput): Promise<Tag[]> {
    try {
      return this.tagModel.find({ status: args.status }).sort(args.sort)
    } catch (error) {
      throw new GeneralError({
        isPublic: false,
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    }
  }

  async create(args: CreateTagInput): Promise<MutationSuccessResponse> {
    try {
      const createdTag = new this.tagModel(args)
      await createdTag.save()
      return {
        message: CREATE_TAG_SUCCESS_MESSAGE,
        status: RequestStatus.Success,
      }
    } catch (error) {
      throw new GeneralError({
        isPublic: false,
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    }
  }
}
