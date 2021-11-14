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
import { IStockIndex } from './stock_index.interface';
import { UserEntity } from '../auth/user.entity';

@Entity({ name: 'stock_indexes' })
export class StockIndexEntity implements IStockIndex {
  @ApiProperty({ description: '스톡 인덱스 고유 번호' })
  @PrimaryGeneratedColumn('increment')
  id: string;

  @ApiProperty({ description: '주식 종목명' })
  @Column()
  name: string;

  @ApiProperty({ description: '수치' })
  @Column()
  point: string;

  @ApiProperty({ description: '등략률' })
  @Column()
  flucRate: string;

  @ApiProperty({ description: '생성시각' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: '수정시각' })
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne((type) => UserEntity, (UserEntity) => UserEntity.stocks)
  @JoinColumn({ name: 'ref_userId' })
  user: UserEntity;

  constructor(partial: Partial<StockIndexEntity>) {
    if (partial) {
      this.name = partial.name;
      this.point = partial.point;
      this.flucRate = partial.flucRate;
    }
  }
}
