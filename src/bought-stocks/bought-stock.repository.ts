import { EntityRepository, Repository } from 'typeorm';
import { BoughtStockEntity } from './entities/bought-stock.entity';

@EntityRepository(BoughtStockEntity)
export class BoughtStockRepository extends Repository<BoughtStockEntity> {}
