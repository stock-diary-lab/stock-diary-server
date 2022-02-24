import { ApiProperty } from '@nestjs/swagger';
import { BoughtStockEntity } from 'src/bought-stock/entities/bought-stock.entity';
import { FavoriteStockEntity } from 'src/favorite-stock/favorite-stock.entity';
import { StockTransactionEntity } from 'src/stock-transaction/stock-transaction.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IListedStock, MarketType } from '../listed-stock.interface';

@Entity({ name: 'listed_stock' })
export class ListedStockEntity implements IListedStock {
  @ApiProperty({ description: '주식 종목 코드' })
  @PrimaryColumn()
  id: string;

  @ApiProperty({ description: '종목명' })
  @Column({ charset: 'utf8' })
  name: string;

  @ApiProperty({ description: '대분류' })
  @Column({ nullable: true, charset: 'utf8' })
  largeSector: string;

  @ApiProperty({ description: '중분류' })
  @Column({ nullable: true, charset: 'utf8' })
  mediumSector: string;

  @ApiProperty({ description: '소속된 시장' })
  @Column({ type: 'enum', enum: MarketType })
  market: MarketType;

  @ApiProperty({ description: '등락률' })
  @Column({ nullable: true, charset: 'utf8' })
  flucRate: string;

  @ApiProperty({ description: '수치' })
  @Column({ nullable: true, charset: 'utf8' })
  point: string;

  @OneToMany(
    () => StockTransactionEntity,
    (stockTransaction) => stockTransaction.listedStock,
  )
  stockTransactions: StockTransactionEntity[];

  @OneToMany(() => BoughtStockEntity, (boughtStock) => boughtStock.listedStock)
  boughtStocks: BoughtStockEntity[];

  @OneToMany(
    () => FavoriteStockEntity,
    (favoriteStock) => favoriteStock.listedStock,
  )
  favoriteStocks: FavoriteStockEntity[];

  constructor(partial: Partial<ListedStockEntity>) {
    if (partial) {
      this.id = partial.id;
      this.name = partial.name;
      this.largeSector = partial.largeSector || null;
      this.mediumSector = partial.mediumSector || null;
      this.market = partial.market;
      this.flucRate = partial.flucRate || null;
      this.point = partial.point || null;
    }
  }
}
