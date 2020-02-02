import { Controller, Request, Post, UseGuards, Inject } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth/auth.service'

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login/:id')
  async login(@Request() req) {
    // this.logger.verbose('Login to system')
    // console.log(req.hostname)
    // console.log(req.headers)
    // console.log(req.params)
    // console.log(req.query)
    return this.authService.login(req.user)
  }
}
