import * as Joi from '@hapi/joi'
import {
  CreateCommentInput,
  RecordStatus,
  CommentAuthorInput,
} from 'src/graphql.schema'

export const CreateCommentValidationSchema = Joi.object<CreateCommentInput>({
  content: Joi.string()
    .min(6)
    .required(),
  postId: Joi.string().required(),
  status: Joi.string().valid(
    RecordStatus.Activate,
    RecordStatus.Pending,
    RecordStatus.Deactivate,
  ),
  author: Joi.object<CommentAuthorInput>({
    id: Joi.string().required(),
    fullname: Joi.string().required(),
    avatar: Joi.string().required(),
  }),
})
