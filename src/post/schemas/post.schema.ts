import { Schema } from 'mongoose'

export const PostSchema = new Schema({
  category: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
    min: [6, 'Too sort post title'],
    max: 500,
  },
  content: {
    type: String,
    min: [6, 'Too short post content'],
  },
  status: {
    type: String,
    enum: ['Active', 'Pending', 'Locked'],
    required: true,
  },
  rate: {
    type: Number,
  },
  author: {},
  createdDate: Date,
  lastUpdatedDate: Date,
  tags: [],
  comments: [],
})
