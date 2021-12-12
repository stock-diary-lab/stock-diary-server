import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IListedStock, MarketType } from '../listed-stock.interface';

@Entity({ name: 'listed_stocks' })
export class ListedStockEntity implements IListedStock {
  @ApiProperty({ description: '주식 종목 코드' })
  @PrimaryColumn()
  id: string;

  @ApiProperty({ description: '종목명' })
  @Column()
  name: string;

  @ApiProperty({ description: '산업군' })
  @Column({ nullable: true })
  industry: string;

  @ApiProperty({ description: '소속된 시장' })
  @Column({ type: 'enum', enum: MarketType })
  market: MarketType;

  constructor(partial: Partial<ListedStockEntity>) {
    if (partial) {
      this.id = partial.id;
      this.name = partial.name;
      this.industry = partial.industry || null;
      this.market = partial.market;
    }
  }
}
