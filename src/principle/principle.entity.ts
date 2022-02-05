import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IPrinciple } from './principle.interface';
import { UserEntity } from '../auth/user.entity';

@Entity({ name: 'principles' })
export class PrincipleEntity implements IPrinciple {
  @ApiProperty({ description: '원칙 고유 번호' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: '원칙 내용' })
  @Column({ charset: 'utf8' })
  content: string;

  @ApiProperty({ description: '날짜' })
  @Column({ type: 'date' })
  date: string;

  @ApiProperty({ description: '생성시각' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: '수정시각' })
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.diaries)
  user: UserEntity;

  constructor(partial: Partial<PrincipleEntity>) {
    if (partial) {
      this.content = partial.content;
      this.date = partial.date;
    }
  }
}
