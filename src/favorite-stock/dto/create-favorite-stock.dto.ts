import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateFavoriteStockDto {
  @ApiProperty({ description: '최선호종목 내용' })
  @IsNotEmpty()
  readonly isFavorite: boolean;

  @ApiProperty({ description: '상장된 주식종목코드' })
  @IsNotEmpty()
  listedStockId: string;
}
