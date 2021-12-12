import { EntityRepository, Repository } from 'typeorm';
import { FavoriteStockEntity } from './favorite-stock.entity';

@EntityRepository(FavoriteStockEntity)
export class FavoriteStockRepository extends Repository<FavoriteStockEntity> {}
