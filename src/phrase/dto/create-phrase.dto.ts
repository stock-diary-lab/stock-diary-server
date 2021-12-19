import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePhraseDto {
  @ApiProperty({ description: '대가 이름' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: '명언 내용' })
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty({ description: '날짜' })
  @IsNotEmpty()
  date: Date;
}
