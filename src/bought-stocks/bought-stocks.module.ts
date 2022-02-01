import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoughtStockRepository } from './bought-stock.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BoughtStockRepository]), AuthModule],
})
export class BoughtStocksModule {}
