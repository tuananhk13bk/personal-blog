import { Schema } from 'mongoose'
import { RecordStatus } from 'src/graphql.schema'

const CommentAuthorSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
})

const ReplySchema = new Schema({
  content: {
    type: String,
    min: 6,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: [
      RecordStatus.Activate,
      RecordStatus.Pending,
      RecordStatus.Deactivate,
    ],
  },
  author: CommentAuthorSchema,
})

export const CommentSchema = new Schema({
  content: {
    type: String,
    required: true,
    min: 6,
  },
  status: {
    type: String,
    required: true,
    enum: [
      RecordStatus.Activate,
      RecordStatus.Pending,
      RecordStatus.Deactivate,
    ],
  },
  author: CommentAuthorSchema,
  reply: [ReplySchema],
  createdDate: Date,
  lastUpdatedDate: Date,
})
