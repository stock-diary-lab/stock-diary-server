import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockRepository } from './stocks.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([StockRepository]), AuthModule],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
