import { Schema } from 'mongoose'
import { UserStatus } from 'src/graphql.schema'

export const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  nickname: { type: String },
  avatar: {
    type: String,
  },
  occupation: {
    type: String,
  },
  social: [
    {
      link: { type: String },
      type: {
        type: String,
        enum: ['Facebook', 'Github', 'Instagram', 'Twitter'],
      },
    },
  ],
  status: {
    type: String,
    enum: [UserStatus.Activate, UserStatus.Deactivate],
  },
  postCount: {
    type: Number,
    default: 0,
  },
  commentCount: {
    type: Number,
    default: 0,
  },
  createdDate: {
    type: Date,
  },
  lastUpdatedDate: {
    type: Date,
  },
})
