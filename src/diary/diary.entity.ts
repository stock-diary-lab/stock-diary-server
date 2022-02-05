import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IDiary } from './diary.interface';
import { UserEntity } from '../auth/user.entity';

@Entity({ name: 'diaries' })
export class DiaryEntity implements IDiary {
  @ApiProperty({ description: '일지 고유 번호' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: '일지 내용' })
  @Column({ charset: 'utf8' })
  content: string;

  @ApiProperty({ description: '날짜' })
  @Column({ type: 'date' })
  date: Date;

  @ApiProperty({ description: '생성시각' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: '수정시각' })
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.diaries)
  user: UserEntity;

  constructor(partial: Partial<DiaryEntity>) {
    if (partial) {
      this.content = partial.content;
      this.date = partial.date;
    }
  }
}
