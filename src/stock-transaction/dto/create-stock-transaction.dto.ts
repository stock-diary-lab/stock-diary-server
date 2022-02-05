import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Type } from '../stock-transaction.interface';

export class CreateStockTransactionDto {
  @ApiProperty({
    enum: ['buy', 'sell'],
    description: '매매 유형',
  })
  readonly type: Type;

  @ApiProperty({ description: '주식 가격' })
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty({ description: '수수료' })
  readonly fee: number;

  @ApiProperty({ description: '주식 수량' })
  @IsNotEmpty()
  readonly quantity: number;

  @ApiProperty({ description: '이유' })
  @IsNotEmpty()
  reason: string;

  @ApiProperty({ description: '날짜' })
  @IsNotEmpty()
  date: string;

  @ApiProperty({ description: '종목코드' })
  @IsNotEmpty()
  listedStockId: string;
}
