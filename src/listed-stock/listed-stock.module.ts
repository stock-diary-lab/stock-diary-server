import { Module } from '@nestjs/common';
import { ListedStockService } from './listed-stock.service';
import { ListedStockController } from './listed-stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListedStockRepository } from './listed-stock.repository';
import { AuthModule } from 'src/auth/auth.module';
import { StockTransactionRepository } from 'src/stock-transaction/stock-transactions.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ListedStockRepository,
      StockTransactionRepository,
    ]),
    AuthModule,
  ],
  controllers: [ListedStockController],
  providers: [ListedStockService],
})
export class ListedStockModule {}
