import { EntityRepository, Repository } from 'typeorm';
import { StockEntity } from './stock.entity';

@EntityRepository(StockEntity)
export class StockRepository extends Repository<StockEntity> {}
