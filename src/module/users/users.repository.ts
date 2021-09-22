import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  async createByProvider({ name, email, provider }: CreateUserDto) {
    const user = await this.save(new UserEntity({ name, email, provider }));
    return user;
  }
}
