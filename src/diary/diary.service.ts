import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { DiaryRepository } from './diaries.repository';
import { UserEntity } from 'src/auth/user.entity';
import { DiaryEntity } from './diary.entity';
import { Between, Like } from 'typeorm';
@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(DiaryRepository)
    private diaryRepository: DiaryRepository,
  ) {}

  async createDiary(createDiaryDto: CreateDiaryDto, user: UserEntity) {
    const { content, date } = createDiaryDto;

    const newDiary = new DiaryEntity({
      content,
      date,
    });

    newDiary.user = user;

    await this.diaryRepository.save(newDiary);

    return { message: 'create success' };
  }

  async findAll(startDate: string, endDate: string, user: UserEntity) {
    const diaries = await this.diaryRepository.find({
      where: {
        date: Between(startDate, endDate),
        user,
      },
    });

    return diaries.reduce((acc, cur) => {
      if (acc[cur.date]) {
        acc[cur.date].push(cur);
      } else {
        acc[cur.date] = [cur];
      }
      return acc;
    }, {});
  }

  async findBySearchWord(searchWord: string, user: UserEntity) {
    if (!searchWord) return [];
    const diaries = await this.diaryRepository.find({
      user,
      content: Like(`%${searchWord}%`),
    });

    return diaries.map((diary) => {
      delete diary.createdAt;
      delete diary.updatedAt;
      return diary;
    });
  }

  findOne(id: number) {
    return this.diaryRepository.find({ where: { id } });
  }

  update(id: number, updateDiaryDto: UpdateDiaryDto) {
    this.diaryRepository.update(id, updateDiaryDto);
    return { message: 'update success' };
  }

  deleteOne(id: number) {
    this.diaryRepository.delete({ id });
    return { message: 'delete success' };
  }
}
