import { EntityRepository, Repository } from 'typeorm';
import { PhraseEntity } from './phrase.entity';

@EntityRepository(PhraseEntity)
export class PhraseRepository extends Repository<PhraseEntity> {}
