import { Resolver, Mutation, Args, Info } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { GqlLocalAuthGuard } from 'src/common/guards/gql-auth.guard'

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('login')
  @UseGuards(GqlLocalAuthGuard)
  async login(@Args('loginInput') args: any): Promise<any> {
    const arr = [0, 3, 5, 6]
    // _.chain(arr)
    //   .tap(console.log)
    //   .thru((v: number[]) => v.pop())
    //   .value()
  }
}
