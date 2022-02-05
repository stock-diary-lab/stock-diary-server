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
    const newDate = new Date(date);

    const newDiary = new DiaryEntity({
      content,
      date: newDate,
    });

    newDiary.user = user;

    await this.diaryRepository.save(newDiary);

    return { message: 'create success' };
  }

  async findAll(startDate: Date, endDate: Date, user: UserEntity) {
    const newEndDate = new Date(endDate);
    newEndDate.setDate(new Date(endDate).getDate() + 1);

    const diaries = await this.diaryRepository.find({
      where: {
        date: Between(
          new Date(startDate).toISOString(),
          new Date(newEndDate).toISOString(),
        ),
        user,
      },
    });

    return diaries.reduce((acc, cur) => {
      const localeDate = cur.date.toLocaleDateString('ko-KR');

      if (acc[localeDate]) {
        acc[localeDate].push(cur);
      } else {
        acc[localeDate] = [cur];
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
