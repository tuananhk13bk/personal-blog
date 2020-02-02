import { Injectable } from '@nestjs/common'
import { Post, CreatePostInput } from 'src/graphql.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Document } from 'mongoose'

@Injectable()
export class PostService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<Post & Document>,
  ) {}

  async getAll(): Promise<Post[]> {
    return this.postModel.find({})
  }

  async create(createPostInput: CreatePostInput): Promise<Post> {
    const createdPost = new this.postModel(createPostInput)
    return createdPost.save()
  }

  async update() {}

  async delete() {}
}
