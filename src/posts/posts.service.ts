import { Injectable, HttpStatus } from '@nestjs/common'
import {
  Post,
  CreatePostInput,
  GetAllPostsInput,
  PostsBucket,
  PostsResponse,
  RecordStatus,
  MutationSuccessResponse,
  MutationStatus,
} from 'src/graphql.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Document } from 'mongoose'
import { PostsHelper } from './posts.helper'
import { MAX_ITEMS_PER_BUCKET } from './posts.constant'
import { GeneralError } from 'src/common/general-error'

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post')
    private readonly postModel: Model<PostsBucket & Document>,
    private readonly postsHelper: PostsHelper,
  ) {}

  async getAll(args: GetAllPostsInput): Promise<PostsResponse> {
    try {
      const bucketOrder = this.postsHelper.calculateBucketOrderByPage(
        args.page,
        args.itemsPerPage,
      )

      const [data, lastBuckets] = await Promise.all([
        await this.postModel.findOne({
          bucketOrder,
          data: { $elemMatch: { status: RecordStatus.Activate } },
        }),
        await this.postModel
          .find()
          .sort({ _id: -1 })
          .limit(1),
      ])

      const totalPages = this.postsHelper.calculateTotalPagesByLastBucket(
        lastBuckets[0],
        args.itemsPerPage,
      )

      const totalItems = this.postsHelper.calculateTotalItemsByLastBucket(
        lastBuckets[0],
      )

      const dataOnPage = this.postsHelper.extractDataOnPageFromBucketData({
        bucket: data.data,
        bucketOrder,
        itemsPerPage: args.itemsPerPage,
        page: args.page,
      })

      return {
        page: args.page,
        totalPages,
        itemsPerPage: args.itemsPerPage,
        totalItems,
        data: dataOnPage,
      }
    } catch (error) {
      throw new GeneralError({
        isPublic: false,
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    }
  }

  async create(args: CreatePostInput): Promise<MutationSuccessResponse> {
    try {
      const currentBucketOrder = await this.postModel.estimatedDocumentCount()

      await this.postModel.updateOne(
        { count: { $lt: MAX_ITEMS_PER_BUCKET } },
        {
          $push: { data: { $each: [args], $position: 0 } },
          $inc: { count: 1 },
          $set: { lastInsertedDate: new Date() },
          $setOnInsert: {
            bucketOrder: currentBucketOrder + 1,
            firstInsertedDate: new Date(),
          },
        },
        { upsert: true },
      )
      return {
        message: 'Create post successfully',
        status: MutationStatus.Success,
      }
    } catch (error) {
      throw new GeneralError({
        isPublic: false,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      })
    }
  }

  async update() {}

  async delete(id: string): Promise<Post> {
    return this.postModel.findByIdAndUpdate(id, { status: 'Deactivate' })
  }
}
