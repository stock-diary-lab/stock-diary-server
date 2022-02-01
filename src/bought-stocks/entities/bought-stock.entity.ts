import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/auth/user.entity';
import { ListedStockEntity } from 'src/listed-stock/entities/listed-stock.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IBoughtStock } from '../bought-stock.interface';

@Entity({ name: 'boughtStocks' })
export class BoughtStockEntity implements IBoughtStock {
  @ApiProperty({ description: '고유 ID' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: '매수량' })
  @Column()
  quantity: number;

  @ApiProperty({ description: '매수 총 금액' })
  @Column()
  amount: number;

  @ManyToOne(() => UserEntity, (user) => user.boughtStocks)
  user: UserEntity;

  @ManyToOne(() => ListedStockEntity, (listedStock) => listedStock.boughtStocks)
  listedStock: ListedStockEntity;

  constructor(partial: Partial<BoughtStockEntity>) {
    if (partial) {
      this.amount = partial.amount;
      this.quantity = partial.quantity;
    }
  }
}
