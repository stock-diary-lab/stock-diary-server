import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DiaryModule } from './diary/diary.module';
import { StockTransactionModule } from './stock/stockTransaction.module';
import { StockIndexModule } from './stock_index/stock_index.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    StockTransactionModule,
    DiaryModule,
    StockIndexModule,
  ],
})
export class AppModule {}
