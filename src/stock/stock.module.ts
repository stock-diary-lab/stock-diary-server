import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { JwtStrategy } from '../auth/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockRepository } from './stocks.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([StockRepository]), AuthModule],
  controllers: [StockController],
  providers: [StockService],
  //exports: [JwtStrategy],
})
export class StockModule {}
