import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Provider } from '../user.interface';

export class CreateUserDto {
  @ApiProperty({ description: '소셜서비스 제공 고유 번호' })
  @IsNotEmpty()
  readonly providerId: string;

  @ApiProperty({ description: '유저 이름' })
  @IsNotEmpty()
  readonly nickname: string;
  @ApiProperty({
    enum: ['google', 'apple', 'kakao'],
    description: '소셜 로그인 서비스 제공자',
  })
  readonly provider: Provider;
}
