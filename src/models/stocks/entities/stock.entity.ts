import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IStock, StockType } from '../interfaces/stock.interface';

@Entity({ name: 'stocks' })
export class Stock implements IStock {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  price: number;

  @Column({ nullable: true, default: null })
  closingPrice: null | number;

  @Column()
  type: StockType;

  @Column()
  reason: string;

  @Column()
  isFavorite: boolean;

  @Column()
  quantity: number;

  @Column()
  date: Date;

  @Column({ default: false })
  isInitial: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
