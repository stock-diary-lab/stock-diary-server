import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePrincipleDto {
  @ApiProperty({ description: '원칙 내용' })
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty({ description: '날짜' })
  @IsNotEmpty()
  date: Date;
}
