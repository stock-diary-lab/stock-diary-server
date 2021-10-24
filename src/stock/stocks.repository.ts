import { EntityRepository, Repository } from 'typeorm';
import { StockEntity } from './stock.entity';
import { CreateStockDto } from './dto/create-stock.dto';

@EntityRepository(StockEntity)
export class StockRepository extends Repository<StockEntity> {
  async createByProvider({
    name,
    price,
    closingPrice,
    type,
    reason,
    isFavorite,
    quantity,
  }: CreateStockDto): Promise<void> {
    await this.save(
      new StockEntity({
        name,
        price,
        closingPrice,
        type,
        reason,
        isFavorite,
        quantity,
      }),
    );
  }
}
