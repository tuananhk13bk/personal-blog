import { Schema } from 'mongoose'
import { RecordStatus } from 'src/graphql.schema'

const TagSchema = new Schema({
  title: {
    type: String,
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
  postsCount: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  createdDate: {
    type: Date,
  },
  lastUpdatedDate: {
    type: Date,
  },
})

export { TagSchema }
