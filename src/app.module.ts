import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DiaryModule } from './diary/diary.module';
import { StockTransactionModule } from './stock-transaction/stock-transaction.module';
import { StockIndexModule } from './stock-index/stock-index.module';
import { ListedStockModule } from './listed-stock/listed-stock.module';
import { PhraseModule } from './phrase/phrase.module';
import { BoughtStocksModule } from './bought-stock/bought-stock.module';
import { ConfigModule } from '@nestjs/config';
import { FavoriteStockModule } from './favorite-stock/favorite-stock.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    StockTransactionModule,
    DiaryModule,
    StockIndexModule,
    ListedStockModule,
    PhraseModule,
    BoughtStocksModule,
    FavoriteStockModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? '.env.development'
          : '.env.development.local',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
  ],
})
export class AppModule {}
