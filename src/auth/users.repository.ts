import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  async createByProvider({
    providerId,
    nickname,
    provider,
  }: CreateUserDto): Promise<void> {
    await this.save(new UserEntity({ providerId, nickname, provider }));
  }
}
