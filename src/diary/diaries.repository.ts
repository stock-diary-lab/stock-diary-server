import { EntityRepository, Repository } from 'typeorm';
import { DiaryEntity } from './diary.entity';

@EntityRepository(DiaryEntity)
export class DiaryRepository extends Repository<DiaryEntity> {}
