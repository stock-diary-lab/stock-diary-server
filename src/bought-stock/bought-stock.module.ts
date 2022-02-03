import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoughtStockRepository } from './bought-stock.repository';
import { AuthModule } from 'src/auth/auth.module';
import { BoughtStockController } from './bought-stock.controller';
import { BoughtStockService } from './bought-stock.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoughtStockRepository]), AuthModule],
  controllers: [BoughtStockController],
  providers: [BoughtStockService],
})
export class BoughtStocksModule {}
