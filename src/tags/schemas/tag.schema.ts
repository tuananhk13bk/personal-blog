import { Schema } from 'mongoose'

const TagSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
  createdDate: {
    type: Date,
  },
  lastUpdatedDate: {
    type: Date,
  },
})

export { TagSchema }
