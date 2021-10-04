import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    const payload = { name: req.user.name, email: req.user.email };

    const accessToken = await this.jwtService.sign(payload);

    return {
      message: 'User information from google',
      user: req.user,
      token: accessToken,
    };
  }

  async signUp(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    this.usersRepository.createByProvider(createUserDto);
    const { name, email } = createUserDto;
    const payload = { name, email };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  async signIn(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    const { name, email } = createUserDto;

    const user = await this.usersRepository.findOne({ email });

    if (user) {
      const payload = { name, email };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
