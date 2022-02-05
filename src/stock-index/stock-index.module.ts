import { Module } from '@nestjs/common';
import { StockIndexService } from './stock-index.service';
import { StockIndexController } from './stock-index.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockIndexRepository } from './stock-indexes.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([StockIndexRepository]), AuthModule],
  controllers: [StockIndexController],
  providers: [StockIndexService],
})
export class StockIndexModule {}
