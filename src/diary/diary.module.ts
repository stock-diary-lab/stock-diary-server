import { Module } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { DiaryController } from './diary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryRepository } from './diaries.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([DiaryRepository]), AuthModule],
  controllers: [DiaryController],
  providers: [DiaryService],
})
export class DiaryModule {}
