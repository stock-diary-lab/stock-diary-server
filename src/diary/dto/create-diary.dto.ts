import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateDiaryDto {
  @ApiProperty({ description: '일지 내용' })
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty({ description: '날짜' })
  @IsNotEmpty()
  date: Date;
}
