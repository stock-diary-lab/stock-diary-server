import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DiaryModule } from './diary/diary.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, StockModule, DiaryModule],
})
export class AppModule {}
