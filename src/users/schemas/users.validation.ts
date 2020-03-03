import * as Joi from '@hapi/joi'
import { User, UserStatus } from 'src/graphql.schema'

export const CreateUserValidationSchema = Joi.object<
  User & { password: string }
>({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required(),
  status: Joi.string()
    .valid(UserStatus.Activate, UserStatus.Deactivate)
    .required(),
  fullname: Joi.string()
    .min(3)
    .max(50)
    .required(),
  nickname: Joi.string()
    .min(3)
    .max(50),
  avatar: Joi.string()
    .min(3)
    .max(300),
  occupation: Joi.string()
    .min(3)
    .max(50),
  social: Joi.array(),
})
