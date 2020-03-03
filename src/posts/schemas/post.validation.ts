import * as Joi from '@hapi/joi'
import {
  CreatePostInput,
  RecordStatus,
  PostAuthorInput,
  GetAllPostsInput,
} from 'src/graphql.schema'

export const CreatePostValidationSchema = Joi.object<CreatePostInput>({
  title: Joi.string()
    .min(6)
    .max(500)
    .required(),
  content: Joi.string()
    .min(6)
    .required(),
  status: Joi.string()
    .valid(RecordStatus.Activate, RecordStatus.Pending, RecordStatus.Deactivate)
    .required(),
  author: Joi.object({
    id: Joi.string().required(),
    fullname: Joi.string()
      .min(6)
      .required(),
    joinDate: Joi.date().required(),
  }).required(),
  tags: Joi.array(),
})

export const GetAllPostsValidationSchema = Joi.object<GetAllPostsInput>({
  page: Joi.number().required(),
  itemsPerPage: Joi.number().required(),
  tags: Joi.array().items(Joi.string()),
})
