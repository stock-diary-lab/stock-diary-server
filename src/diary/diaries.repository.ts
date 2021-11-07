import { EntityRepository, Repository } from 'typeorm';
import { DiaryEntity } from './diary.entity';
import { CreateDiaryDto } from './dto/create-diary.dto';

@EntityRepository(DiaryEntity)
export class DiaryRepository extends Repository<DiaryEntity> {
  async createByProvider({ content }: CreateDiaryDto): Promise<void> {
    await this.save(
      new DiaryEntity({
        content,
      }),
    );
  }
}
