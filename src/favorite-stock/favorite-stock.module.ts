import { Module } from '@nestjs/common';
import { FavoriteStockService } from './favorite-stock.service';
import { FavoriteStockController } from './favorite-stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteStockRepository } from './favorite-stocks.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteStockRepository]), AuthModule],
  controllers: [FavoriteStockController],
  providers: [FavoriteStockService],
})
export class FavoriteStockModule {}
