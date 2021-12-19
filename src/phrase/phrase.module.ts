import { Module } from '@nestjs/common';
import { PhraseService } from './phrase.service';
import { PhraseController } from './phrase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhraseRepository } from './phrases.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PhraseRepository]), AuthModule],
  controllers: [PhraseController],
  providers: [PhraseService],
})
export class PhraseModule {}
