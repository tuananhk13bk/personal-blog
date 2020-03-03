import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'
import { hashData } from '../utils/hash.util'

@Injectable()
export class HashPipe implements PipeTransform {
  constructor(private readonly hashField: string) {}

  async transform(value: object, metadata: ArgumentMetadata) {
    const hashedData = await hashData(value[this.hashField])
    return { ...value, [this.hashField]: hashedData }
  }
}
