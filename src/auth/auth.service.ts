import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/graphql.schema'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = (await this.usersService.getBy({ email })) as User & {
      password: string
    }
    if (user && user.password === password) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      fullname: user.fullname,
      occupation: user.occupation,
    }
    return {
      accessToken: this.jwtService.sign(payload),
    }
  }
}
