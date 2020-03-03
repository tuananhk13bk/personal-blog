import {
  Controller,
  Request,
  Post,
  UseGuards,
  Inject,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth/auth.service'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UseInterceptors(FileInterceptor('file'))
  async login(@UploadedFile() file) {
    // this.logger.verbose('Login to system')
    // console.log(req.hostname)
    // console.log(req.headers)
    // console.log(req.params)
    // console.log(req.query)
  }
}
