import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DiaryModule } from './diary/diary.module';
import { StockTransactionModule } from './stock-transaction/stock-transaction.module';
import { StockIndexModule } from './stock_index/stock_index.module';
import { ListedStockModule } from './listed-stock/listed-stock.module';
import { FavoriteStockModule } from './favorite-stock/favorite-stock.module';
import { PhraseModule } from './phrase/phrase.module';
import { PrincipleModule } from './principle/principle.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    StockTransactionModule,
    DiaryModule,
    StockIndexModule,
    ListedStockModule,
    FavoriteStockModule,
    PhraseModule,
    PrincipleModule,
  ],
})
export class AppModule {}
