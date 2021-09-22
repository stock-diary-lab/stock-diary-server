import {
  Get,
  Put,
  Post,
  Body,
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 200,
    type: UserEntity,
  })
  @Get(':email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findOneWithEmail(email);
  }

  @ApiResponse({
    status: 201,
    type: UserEntity,
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);

    return newUser;
  }
}
