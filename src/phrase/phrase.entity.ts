import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IPhrase } from './phrase.interface';
import { UserEntity } from '../auth/user.entity';

@Entity({ name: 'diaries' })
export class PhraseEntity implements IPhrase {
  @ApiProperty({ description: '명언 고유 번호' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: '대가 이름' })
  @Column({ charset: 'utf8' })
  name: string;

  @ApiProperty({ description: '명언 내용' })
  @Column({ charset: 'utf8' })
  content: string;

  @ApiProperty({ description: '날짜' })
  @Column()
  date: Date;

  @ApiProperty({ description: '생성시각' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: '수정시각' })
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.diaries)
  user: UserEntity;

  constructor(partial: Partial<PhraseEntity>) {
    if (partial) {
      this.content = partial.content;
      this.date = partial.date;
    }
  }
}
