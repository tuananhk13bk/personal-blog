import { Schema } from 'mongoose'

export const TagSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: [2, 'Too short tag title'],
    max: [50, 'Too long tag title'],
  },
  image: {
    type: String,
  },
  isPopularTag: {
    type: Boolean,
  },
  createdAt: Date,
  createdBy: Schema.Types.ObjectId,
  lastUpdatedAt: Date,
})
