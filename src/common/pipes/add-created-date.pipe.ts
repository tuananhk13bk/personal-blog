import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'

@Injectable()
export class CreatedDatePipe implements PipeTransform {
  transform(value: object, metadata: ArgumentMetadata) {
    return { ...value, createdDate: new Date() }
  }
}
