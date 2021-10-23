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
import { Type } from './stock.interface';
import { UserEntity } from '../auth/user.entity';

@Entity({ name: 'stocks' })
export class StockEntity {
  @ApiProperty({ description: '스톡 고유 번호' })
  @PrimaryGeneratedColumn('increment')
  id: string;

  @ApiProperty({ description: '주식 가격' })
  @Column()
  price: string;

  @ApiProperty({ description: '주식 종가' })
  @Column()
  closingPrice: number;

  @ApiProperty({ description: '매매 유형' })
  @Column({ type: 'enum', enum: Type })
  type: Type;

  @ApiProperty({ description: '이유' })
  @Column()
  reason: string;

  @ApiProperty({ description: '선호 여부' })
  @Column()
  isFavorite: number;

  @ApiProperty({ description: '주식 수량' })
  @Column()
  quantity: number;

  @ApiProperty({ description: '생성시각' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: '수정시각' })
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne((type) => UserEntity, (UserEntity) => UserEntity.stocks)
  @JoinColumn({ name: 'ref_userId' })
  user: UserEntity;
}
