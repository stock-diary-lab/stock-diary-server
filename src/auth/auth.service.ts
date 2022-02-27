import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async googleLogin(req): Promise<{ user: CreateUserDto }> {
    if (!req.user) {
      throw new UnauthorizedException('google login failed');
    }

    return {
      user: req.user,
    };
  }

  async createUserIfExist(
    createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string; userName: string }> {
    const { nickname, providerId, provider } = createUserDto;

    const user = await this.usersRepository.findOne({
      nickname,
      providerId,
      provider,
    });

    if (!user) {
      await this.usersRepository.createByProvider(createUserDto);
    }

    const payload = { nickname, providerId };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken, userName: nickname };
  }

  async deleteUser(user: UserEntity) {
    await this.usersRepository.delete({ id: user.id });

    return { message: 'delete Success' };
  }
}
