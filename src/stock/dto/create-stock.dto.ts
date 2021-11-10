import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Type } from '../stock.interface';

export class CreateStockDto {
  @ApiProperty({ description: '주식 종목명' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    enum: ['buy', 'sell'],
    description: '매매 유형',
  })
  readonly type: Type;

  @ApiProperty({ description: '주식 가격' })
  @IsNotEmpty()
  readonly price: string;

  @ApiProperty({ description: '수수료' })
  readonly fee: number;

  @ApiProperty({ description: '주식 수량' })
  @IsNotEmpty()
  readonly quantity: number;

  @ApiProperty({ description: '이유' })
  @IsNotEmpty()
  reason: string;
}
