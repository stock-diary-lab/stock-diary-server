import { EntityRepository, Repository } from 'typeorm';
import { StockIndexEntity } from './stock_index.entity';

@EntityRepository(StockIndexEntity)
export class StockIndexRepository extends Repository<StockIndexEntity> {}
