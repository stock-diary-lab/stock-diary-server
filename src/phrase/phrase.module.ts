import { Module } from '@nestjs/common';
import { PhraseService } from './phrase.service';
import { PhraseController } from './phrase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhraseRepository } from './phrase.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PhraseRepository])],
  controllers: [PhraseController],
  providers: [PhraseService],
})
export class PhraseModule {}
