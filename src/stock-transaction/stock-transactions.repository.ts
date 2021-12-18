import { EntityRepository, Repository } from 'typeorm';
import { StockTransactionEntity } from './stock-transaction.entity';

@EntityRepository(StockTransactionEntity)
export class StockTransactionRepository extends Repository<StockTransactionEntity> {}
