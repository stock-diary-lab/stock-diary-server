import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { JwtStrategy } from '../auth/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockRepository } from './stocks.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {},
    }),
    TypeOrmModule.forFeature([StockRepository]),
  ],
  controllers: [StockController],
  providers: [StockService],
  //exports: [JwtStrategy],
})
export class StockModule {}
