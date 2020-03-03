import * as Joi from '@hapi/joi'

export const createCategorySchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .required(),
  priority: Joi.number()
    .min(1)
    .required(),
  level: Joi.number()
    .min(1)
    .max(3)
    .required(),
  parentId: Joi.string(),
})
