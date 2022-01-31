import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IStockTransaction, Type } from './stock-transaction.interface';
import { UserEntity } from '../auth/user.entity';
import { ListedStockEntity } from 'src/listed-stock/entities/listed-stock.entity';

@Entity({ name: 'stockTransactions' })
export class StockTransactionEntity implements IStockTransaction {
  @ApiProperty({ description: '거래내역 고유 번호' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: '매매 유형' })
  @Column({ type: 'enum', enum: Type })
  type: Type;

  @ApiProperty({ description: '주식 가격' })
  @Column()
  price: number;

  @ApiProperty({ description: '주식 수량' })
  @Column()
  quantity: number;

  @ApiProperty({ description: '수수료' })
  @Column({ nullable: true })
  fee: number;

  @ApiProperty({ description: '이유' })
  @Column({ charset: 'utf8' })
  reason: string;

  @ApiProperty({ description: '날짜' })
  @Column()
  date: Date;

  @ApiProperty({ description: '실현손익' })
  @Column({ nullable: true })
  income: number;

  @ApiProperty({ description: '손익률' })
  @Column({ nullable: true })
  incomeRatio: number;

  @ApiProperty({ description: '잔여 매도량' })
  @Column({ nullable: true })
  remainCount: number;

  @ApiProperty({ description: '매수여부' })
  @Column({ nullable: true })
  isAllSold: boolean;

  @ApiProperty({ description: '생성시각' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: '수정시각' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.stockTransactions)
  user: UserEntity;

  @ManyToOne(
    () => ListedStockEntity,
    (listedStock) => listedStock.stockTransactions,
  )
  listedStock: ListedStockEntity;

  constructor(partial: Partial<StockTransactionEntity>) {
    if (partial) {
      this.type = partial.type;
      this.price = partial.price;
      this.fee = partial.fee;
      this.quantity = partial.quantity;
      this.reason = partial.reason;
      this.date = partial.date;
    }
  }
}
