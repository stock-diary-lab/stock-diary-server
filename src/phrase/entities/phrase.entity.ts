import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IPhrase } from '../phrase.interface';

@Entity({ name: 'phrases' })
export class PhraseEntity implements IPhrase {
  @ApiProperty({ description: '명언 고유번호' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ description: '명언 대가 한글이름' })
  @Column()
  korName: string;

  @ApiProperty({ description: '명언 대가 영어이름' })
  @Column()
  engName: string;

  @ApiProperty({ description: '명언 내용' })
  @Column()
  content: string;

  @ApiProperty({ description: '노출 여부' })
  @Column()
  display: boolean;

  constructor(partial: Partial<PhraseEntity>) {
    if (partial) {
      this.korName = partial.korName;
      this.engName = partial.engName;
      this.content = partial.content;
      this.display = partial.display;
    }
  }
}
