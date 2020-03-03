import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class CheckExistsPipe implements PipeTransform {
  constructor(private readonly userService: UsersService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    this.userService.checkUserExists({ email: value.email })
    return value
  }
}
