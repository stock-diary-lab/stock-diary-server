import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Redirect,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  @Redirect(`http://localhost:8080`, 302)
  async googleAuthRedirect(@Req() req) {
    const { user } = await this.authService.googleLogin(req);

    const { accessToken } = await this.authService.createUserIfExist(user);

    return {
      url: `http://localhost:8080?token=${accessToken}`,
    };
  }

  @ApiResponse({
    status: 200,
  })
  @Post('login/kakao')
  async singUp(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return await this.authService.createUserIfExist(createUserDto);
  }

  // token으로 유저 정보 리턴
  @ApiResponse({
    status: 200,
    description: '유저 정보 리턴 api',
  })
  @ApiBearerAuth('jwt')
  @Get('user/me')
  @UseGuards(AuthGuard())
  getUser(@Req() req) {
    return {
      userName: req.user.nickname,
    };
  }

  @ApiBearerAuth('jwt')
  @Delete('user')
  @UseGuards(AuthGuard())
  deleteUser(@Req() req) {
    return this.authService.deleteUser(req.user);
  }
}
