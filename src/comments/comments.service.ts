import { Injectable, Query } from '@nestjs/common'
import { Model, Document } from 'mongoose'
import { Comment, CreateCommentInput } from 'src/graphql.schema'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('Comment')
    private readonly commentModel: Model<Document & Comment>,
  ) {}

  async getAll(): Promise<Comment[]> {
    return this.commentModel.find()
  }

  async create(args: CreateCommentInput): Promise<Comment> {
    const createdComment = new this.commentModel(args)
    return createdComment.save()
  }
}
