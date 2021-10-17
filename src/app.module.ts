import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, StockModule],
})
export class AppModule {}
