import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IDiary } from './diary.interface';
import { UserEntity } from '../auth/user.entity';

@Entity({ name: 'diaries' })
export class DiaryEntity implements IDiary {
  @ApiProperty({ description: '일지 고유 번호' })
  @PrimaryGeneratedColumn('increment')
  id: string;

  @ApiProperty({ description: '일지 내용' })
  @Column()
  content: string;

  @ApiProperty({ description: '생성시각' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: '수정시각' })
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne((type) => UserEntity, (UserEntity) => UserEntity.stocks)
  @JoinColumn({ name: 'ref_userId' })
  user: UserEntity;

  constructor(partial: Partial<DiaryEntity>) {
    if (partial) {
      this.content = partial.content;
    }
  }
}
