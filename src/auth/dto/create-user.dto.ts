import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Provider } from '../user.interface';

export class CreateUserDto {
  @ApiProperty({ description: '유저 이름' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: '유저 이메일' })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    enum: ['google', 'apple', 'kakao'],
    description: '소셜 로그인 서비스 제공자',
  })
  readonly provider: Provider;
}
