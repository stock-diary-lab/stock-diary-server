import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ReadListedStockDto {
  @ApiProperty({
    description: '종목명 검색값',
  })
  @IsNotEmpty()
  readonly name: string;
}
