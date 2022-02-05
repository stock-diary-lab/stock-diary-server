import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IFavoriteStock } from './favorite-stock.interface';
import { UserEntity } from '../auth/user.entity';

@Entity({ name: 'favorite_stock' })
export class FavoriteStockEntity implements IFavoriteStock {
  @ApiProperty({ description: '최선호종목 고유 번호' })
  @PrimaryGeneratedColumn('increment')
  id: string;

  @ApiProperty({ description: '최선호종목 여부' })
  @Column()
  isFavorite: boolean;

  @ApiProperty({ description: '날짜' })
  @Column({ type: 'date' })
  date: string;

  @ApiProperty({ description: '생성시각' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: '수정시각' })
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.favoriteStocks)
  user: UserEntity;

  constructor(partial: Partial<FavoriteStockEntity>) {
    if (partial) {
      this.isFavorite = partial.isFavorite;
      this.date = partial.date;
    }
  }
}
