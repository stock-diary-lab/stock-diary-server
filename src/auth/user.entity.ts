import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IUser, Provider } from './user.interface';
import { StockTransactionEntity } from 'src/stock-transaction/stock-transaction.entity';
import { DiaryEntity } from 'src/diary/diary.entity';
import { FavoriteStockEntity } from 'src/favorite-stock/favorite-stock.entity';
import { BoughtStockEntity } from 'src/bought-stock/entities/bought-stock.entity';

@Entity({ name: 'users' })
export class UserEntity implements IUser {
  @ApiProperty({ description: '유저 고유 번호' })
  @PrimaryGeneratedColumn('increment')
  id: string;

  @ApiProperty({ description: '소셜서비스 제공 고유 번호' })
  @Column()
  providerId: string;

  @ApiProperty({ description: '닉네임' })
  @Column({ charset: 'utf8' })
  nickname: string;

  @ApiProperty({ description: '소셜 로그인 서비스 제공자' })
  @Column({ type: 'enum', enum: Provider })
  provider: Provider;

  @ApiProperty({ description: '생성시각' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: '수정시각' })
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(
    () => StockTransactionEntity,
    (stockTransaction) => stockTransaction.user,
  )
  stockTransactions: StockTransactionEntity[];

  @OneToMany(() => DiaryEntity, (diary) => diary.user)
  diaries: DiaryEntity[];

  @OneToMany(() => FavoriteStockEntity, (favoriteStock) => favoriteStock.user)
  favoriteStocks: FavoriteStockEntity[];

  @OneToMany(() => BoughtStockEntity, (boughtStock) => boughtStock.user)
  boughtStocks: BoughtStockEntity[];

  constructor(partial: Partial<UserEntity>) {
    if (partial) {
      this.providerId = partial.providerId;
      this.nickname = partial.nickname;
      this.provider = partial.provider;
    }
  }
}
