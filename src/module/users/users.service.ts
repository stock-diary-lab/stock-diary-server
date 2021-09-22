import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const existedUser = await this.usersRepository.findOne({ email });

    if (existedUser) {
      throw new ForbiddenException('Email already existed.');
    }

    const newUser = await this.usersRepository.createByProvider(createUserDto);

    return newUser;
  }

  async findOneWithEmail(email: string) {
    const foundUser = await this.usersRepository.findOne({ email });

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    return foundUser;
  }

  async deleteOne(id: number) {
    const foundUser = await this.usersRepository.findOne({ id });

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    const isDeleted = await this.usersRepository.delete(foundUser);

    return !!isDeleted;
  }
}
