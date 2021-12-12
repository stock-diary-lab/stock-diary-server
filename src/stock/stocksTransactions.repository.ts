import { EntityRepository, Repository } from 'typeorm';
import { StockTransactionEntity } from './stockTransaction.entity';

@EntityRepository(StockTransactionEntity)
export class StockTransactionRepository extends Repository<StockTransactionEntity> {}
