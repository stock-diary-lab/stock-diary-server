import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { DiaryRepository } from './diaries.repository';
import { UserEntity } from 'src/auth/user.entity';
import { DiaryEntity } from './diary.entity';
import { Between } from 'typeorm';

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(DiaryRepository)
    private DiaryRepository: DiaryRepository,
  ) {}

  async createDiary(createDiaryDto: CreateDiaryDto, user: UserEntity) {
    const { content, date } = createDiaryDto;
    const newDate = new Date(date);
    newDate.setTime(
      newDate.getTime() + -newDate.getTimezoneOffset() * 60 * 1000,
    );

    const newDiary = new DiaryEntity({
      content,
      date: newDate,
    });

    newDiary.user = user;

    await this.DiaryRepository.save(newDiary);

    return { message: 'create success' };
  }

  async findAll(startDate: Date, endDate: Date, user: UserEntity) {
    const newEndDate = new Date(endDate);
    newEndDate.setDate(new Date(endDate).getDate() + 1);

    const diaries = await this.DiaryRepository.find({
      where: {
        date: Between(
          new Date(startDate).toISOString(),
          new Date(newEndDate).toISOString(),
        ),
        user,
      },
    });

    return diaries.reduce((acc, cur) => {
      const localeDate = cur.date.toLocaleDateString();

      if (acc[localeDate]) {
        acc[localeDate].push(cur);
      } else {
        acc[localeDate] = [cur];
      }
      return acc;
    }, {});
  }

  findOne(id: number) {
    return this.DiaryRepository.find({ where: { id } });
  }

  update(id: number, updateDiaryDto: UpdateDiaryDto) {
    this.DiaryRepository.update(id, updateDiaryDto);
  }

  deleteOne(id: number) {
    this.DiaryRepository.delete({ id });
    return 'delete success';
  }
}
