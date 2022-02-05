import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateFavoriteStockDto {
  @ApiProperty({ description: '최선호종목 내용' })
  @IsNotEmpty()
  readonly isFavorite: boolean;

  @ApiProperty({ description: '날짜' })
  @IsNotEmpty()
  date: string;
}
