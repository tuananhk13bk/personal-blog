import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common'
import { ObjectSchema } from '@hapi/joi'
import { GeneralError } from '../general-error'

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value)
    if (error) {
      throw new GeneralError({
        isPublic: true,
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      })
    }
    return value
  }
}
