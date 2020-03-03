import { Schema } from 'mongoose'
import { CommentStatus } from 'src/graphql.schema'

export const CommentSchema = new Schema({
  content: {
    type: String,
    required: true,
    min: [6],
    max: [500],
  },
  status: {
    type: String,
    required: true,
    enum: [CommentStatus.Activate, CommentStatus.Deactivate],
  },
  author: {
    id: Schema.Types.ObjectId,
    fullname: String,
    avatar: String,
  },
  createdDate: Date,
  lastUpdatedDate: Date,
})
