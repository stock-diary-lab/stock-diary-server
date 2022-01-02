import { EntityRepository, Repository } from 'typeorm';
import { PrincipleEntity } from './principle.entity';

@EntityRepository(PrincipleEntity)
export class PrincipleRepository extends Repository<PrincipleEntity> {}
