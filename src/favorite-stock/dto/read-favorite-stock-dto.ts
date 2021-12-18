import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ReadFavoriteStockDto {
  @ApiProperty({
    description: '조회하고자 하는 최선호종목의 시작날짜',
  })
  @IsNotEmpty()
  readonly startDate: Date;

  @ApiProperty({
    description: '조회하고자 하는 최선호종목의 마지막날짜',
  })
  @IsNotEmpty()
  readonly endDate: Date;
}
