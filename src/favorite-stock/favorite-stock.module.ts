import { Module } from '@nestjs/common';
import { FavoriteStockService } from './favorite-stock.service';
import { FavoriteStockController } from './favorite-stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteStockRepository } from './favorite-stocks.repository';
import { AuthModule } from 'src/auth/auth.module';
import { ListedStockRepository } from 'src/listed-stock/listed-stock.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteStockRepository, ListedStockRepository]),
    AuthModule,
  ],
  controllers: [FavoriteStockController],
  providers: [FavoriteStockService],
})
export class FavoriteStockModule {}
