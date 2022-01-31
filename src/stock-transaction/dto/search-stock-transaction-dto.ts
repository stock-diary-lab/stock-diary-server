import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SearchStockTransactionDto {
  @ApiProperty({
    description: '검색 키워드',
  })
  @IsNotEmpty()
  readonly searchWord: string;
}
