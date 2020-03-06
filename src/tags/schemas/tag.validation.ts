import * as Joi from '@hapi/joi'
import {
  Tag,
  RecordStatus,
  GetAllTagsInput,
  GetAllTagsSortInput,
  SortOrder,
} from 'src/graphql.schema'

const GetAllTagsValidationSchema = Joi.object<GetAllTagsInput>({
  status: Joi.string()
    .valid(RecordStatus.Activate, RecordStatus.Pending, RecordStatus.Deactivate)
    .required(),
  sort: Joi.object<GetAllTagsSortInput>({
    title: Joi.string().valid(SortOrder.ascending, SortOrder.descending),
    postsCount: Joi.string().valid(SortOrder.ascending, SortOrder.descending),
    lastUpdatedDate: Joi.string().valid(
      SortOrder.ascending,
      SortOrder.descending,
    ),
  }),
})

const CreateTagValidationSchema = Joi.object<Tag>({
  title: Joi.string()
    .min(2)
    .max(20)
    .required(),
  status: Joi.string()
    .valid(RecordStatus.Activate, RecordStatus.Pending, RecordStatus.Deactivate)
    .required(),
})

export { GetAllTagsValidationSchema, CreateTagValidationSchema }
