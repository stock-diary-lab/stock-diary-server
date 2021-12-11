import { EntityRepository, Repository } from 'typeorm';
import { ListedStockEntity } from './entities/listed-stock.entity';

@EntityRepository(ListedStockEntity)
export class ListedStockRepository extends Repository<ListedStockEntity> {}
