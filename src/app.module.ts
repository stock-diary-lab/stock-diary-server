import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DiaryModule } from './diary/diary.module';
import { StockTransactionModule } from './stock/stockTransaction.module';
import { StockIndexModule } from './stock_index/stock_index.module';
import { ListedStockModule } from './listed-stock/listed-stock.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    StockTransactionModule,
    DiaryModule,
    StockIndexModule,
    ListedStockModule,
  ],
})
export class AppModule {}
