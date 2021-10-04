import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IUser, Provider } from './user.interface';

@Entity({ name: 'users' })
export class UserEntity implements IUser {
  @ApiProperty({ description: '유저 고유 번호' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: '이름' })
  @Column()
  name: string;

  @ApiProperty({ description: '이메일' })
  @Column()
  email: string;

  @ApiProperty({ description: '비밀번호' })
  @Column({ nullable: true, type: 'text' })
  password: string;

  @ApiProperty({ description: '소셜 로그인 서비스 제공자' })
  @Column({ type: 'enum', enum: Provider })
  provider: Provider;

  @ApiProperty({ description: '생성시각' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: '수정시각' })
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    if (partial) {
      this.name = partial.name;
      this.email = partial.email;
      this.provider = partial.provider;
      this.password = partial.password || null;
    }
  }
}
