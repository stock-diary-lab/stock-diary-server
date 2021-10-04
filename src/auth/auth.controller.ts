import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }

  @ApiResponse({
    status: 201,
  })
  @Post('auth/signup/kakao')
  singUp(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @ApiResponse({
    status: 200,
  })
  @Post('auth/signin/kakao')
  singIn(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.authService.signIn(createUserDto);
  }

  // token으로 가입 인증
  @ApiResponse({
    status: 200,
  })
  @Post('auth/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log('req', req);
  }
}
