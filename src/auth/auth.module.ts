import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersModule } from 'src/users/users.module'
import {
  PassportModule,
  AuthModuleAsyncOptions,
  AuthModuleOptions,
  AuthOptionsFactory,
  PassportStrategy,
} from '@nestjs/passport'
import { LocalStrategy } from './local.strategy'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants'
import { AuthResolver } from './auth.resolver'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
