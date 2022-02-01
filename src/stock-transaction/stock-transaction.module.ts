import { Module } from '@nestjs/common';
import { StockTransactionService } from './stock-transaction.service';
import { StockTransactionController } from './stock-transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockTransactionRepository } from './stock-transactions.repository';
import { AuthModule } from 'src/auth/auth.module';
import { ListedStockRepository } from 'src/listed-stock/listed-stock.repository';
import { BoughtStockRepository } from 'src/bought-stocks/bought-stock.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StockTransactionRepository,
      ListedStockRepository,
      BoughtStockRepository,
    ]),
    AuthModule,
  ],
  controllers: [StockTransactionController],
  providers: [StockTransactionService],
})
export class StockTransactionModule {}
