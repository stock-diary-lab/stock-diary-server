import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePhraseDto {
  @ApiProperty({ description: '대가 한글 이름' })
  @IsNotEmpty()
  korName: string;

  @ApiProperty({ description: '대가 영어 이름' })
  @IsNotEmpty()
  engName: string;

  @ApiProperty({ description: '명언 내용' })
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: '노출 여부' })
  display: boolean;
}
