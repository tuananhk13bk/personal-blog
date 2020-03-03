import * as Joi from '@hapi/joi'
import { Tag } from 'src/graphql.schema'

const TagValidationSchema = Joi.object<Tag>({
  title: Joi.string()
    .min(2)
    .max(20)
    .required(),
  priority: Joi.number()
    .min(1)
    .required(),
  createdDate: Joi.date(),
  lastUpdatedDate: Joi.date(),
})

export { TagValidationSchema }
