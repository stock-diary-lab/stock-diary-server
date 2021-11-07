import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { DiaryRepository } from './diaries.repository';

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(DiaryRepository)
    private DiaryRepository: DiaryRepository,
  ) {}

  async createDiaryIfExist(
    createDiaryDto: CreateDiaryDto,
  ): Promise<{ diary: any }> {
    const { content } = createDiaryDto;

    const diary = await this.DiaryRepository.findOne({
      content,
    });

    if (!diary) {
      await this.DiaryRepository.createByProvider(createDiaryDto);
    }

    return { diary };
  }

  findAll() {
    return this.DiaryRepository.find();
  }

  findOne(id: string) {
    return this.DiaryRepository.find({ where: { id } });
  }

  update(id: string, updateDiaryDto: UpdateDiaryDto) {
    this.DiaryRepository.update(id, updateDiaryDto);
  }

  deleteOne(id: string) {
    this.DiaryRepository.delete({ id });
    return 'delete success';
  }
}
