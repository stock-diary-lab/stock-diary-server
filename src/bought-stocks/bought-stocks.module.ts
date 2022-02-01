import { Module } from '@nestjs/common';
import { BoughtStocksService } from './bought-stocks.service';
import { BoughtStocksController } from './bought-stocks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoughtStockRepository } from './bought-stock.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BoughtStockRepository]), AuthModule],
  controllers: [BoughtStocksController],
  providers: [BoughtStocksService],
})
export class BoughtStocksModule {}
