import { Module } from '@nestjs/common';
import { StockTransactionService } from './stockTransaction.service';
import { StockTransactionController } from './stockTransaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockTransactionRepository } from './stocksTransactions.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([StockTransactionRepository]), AuthModule],
  controllers: [StockTransactionController],
  providers: [StockTransactionService],
})
export class StockTransactionModule {}
