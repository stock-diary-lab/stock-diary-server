import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ReadStockDto {
  @ApiProperty({
    description: '조회하고자 하는 주식내역의 날짜',
  })
  @IsNotEmpty()
  readonly date: Date;
}
