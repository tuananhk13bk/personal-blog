import { Schema } from 'mongoose'

const SinglePostSchema = new Schema({
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
    enum: ['Activate', 'Pending', 'Deactivate'],
    required: true,
  },
  author: {
    id: Schema.Types.ObjectId,
    username: String,
    avatar: String,
  },
  tags: [
    {
      id: Schema.Types.ObjectId,
      title: String,
    },
  ],
  createdDate: Date,
  lastUpdatedDate: Date,
})

const PostsBucketSchema = new Schema({
  count: {
    type: Number,
    required: true,
  },
  bucketOrder: {
    type: Number,
    required: true,
  },
  firstInsertedDate: {
    type: Date,
    required: true,
  },
  lastInsertedDate: {
    type: Date,
    required: true,
  },
  data: [SinglePostSchema],
})

export { PostsBucketSchema }
