import { Schema } from 'mongoose'

export const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
    min: [2, 'Too short category title'],
    max: [100, 'Too long category title'],
  },
  priority: {
    type: Number,
    required: true,
    min: [1, 'Category priority must be greater than 1'],
  },
  level: {
    type: Number,
    required: true,
    min: [1, 'Category level must be greater than 1'],
    max: [3, 'Category level must be lower than 3'],
  },
  parentId: { type: Schema.Types.ObjectId },
  createdDate: Date,
  lastUpdatedDate: Date,
})
