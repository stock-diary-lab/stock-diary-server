import { Module } from '@nestjs/common';
import { StockIndexService } from './stock_index.service';
import { StockIndexController } from './stock_index.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { StockIndexRepository } from './stock_indexes.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [StockIndexController],
  providers: [StockIndexService],
})
export class StockIndexModule {}
