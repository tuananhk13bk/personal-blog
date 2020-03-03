import { Resolver, Args, Mutation, Query } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { User, RegisterInput, GetAllUsersInput } from 'src/graphql.schema'
import { UsePipes } from '@nestjs/common'
import { CreatedDatePipe } from 'src/common/pipes/add-created-date.pipe'
import { HashPipe } from 'src/common/pipes/hash.pipe'
import { CreateUserValidationSchema } from './schemas/users.validation'
import { JoiValidationPipe } from 'src/common/pipes/validation.pipe'
import { CheckExistsPipe } from 'src/common/pipes/check-exists.pipe'

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Query('getAllUsers')
  async getAll(
    @Args('getAllUsersInput') args: GetAllUsersInput,
  ): Promise<User[]> {
    return this.userService.getAll(args)
  }

  @Query('getUserByEmail')
  async getByEmail(@Args('email') email: string): Promise<User> {
    return this.userService.getBy({ email })
  }

  @Mutation('register')
  @UsePipes(new HashPipe('password'))
  @UsePipes(CreatedDatePipe)
  @UsePipes(new JoiValidationPipe(CreateUserValidationSchema))
  async register(@Args('registerInput') args: RegisterInput): Promise<User> {
    await this.userService.checkUserExists({ email: args.email })
    return this.userService.register(args)
  }

  @Mutation('deleteUserById')
  async deleteById(@Args('id') id: string): Promise<User> {
    return this.userService.deleteById(id)
  }
}
