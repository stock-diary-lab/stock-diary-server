import { Module } from '@nestjs/common';
import { ListedStockService } from './listed-stock.service';
import { ListedStockController } from './listed-stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListedStockRepository } from './listed-stock.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ListedStockRepository]), AuthModule],
  controllers: [ListedStockController],
  providers: [ListedStockService],
})
export class ListedStockModule {}
