import { Module } from '@nestjs/common'
//import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule }from '../module/users/users.module'
import { GoogleOauthStrategy } from './google.strategy'
//import { JwtStrategy } from './jwt.strategy'
//import { ACCESS_TOKEN_SECRET } from '../environments'


@Module({
    imports: [
      UsersModule,
      PassportModule,
    ],
    providers: [AuthService, GoogleOauthStrategy],
    controllers: [AuthController],
  })
  export class AuthModule {}


