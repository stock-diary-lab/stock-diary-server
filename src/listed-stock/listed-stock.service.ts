import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StockTransactionRepository } from 'src/stock-transaction/stock-transactions.repository';
import { Like } from 'typeorm';
import { ListedStockEntity } from './entities/listed-stock.entity';
import { MarketType } from './listed-stock.interface';
import { ListedStockRepository } from './listed-stock.repository';

@Injectable()
export class ListedStockService {
  constructor(
    @InjectRepository(ListedStockRepository)
    @InjectRepository(StockTransactionRepository)
    private listedStockRepository: ListedStockRepository,
  ) {}

  async createAll(list: { [key: string]: string }[]) {
    for await (const { SEC_NM_KOR, IDX_NM_KOR, CMP_CD, CMP_KOR } of list) {
      const found = await this.listedStockRepository.findOne({ id: CMP_CD });
      if (found) return;

      const newListedStock = new ListedStockEntity({
        id: CMP_CD,
        name: CMP_KOR,
        market: MarketType.KOSPI,
        largeSector: SEC_NM_KOR,
        mediumSector: IDX_NM_KOR.slice(5),
      });

      await this.listedStockRepository.save(newListedStock);
    }
  }

  async findAll() {
    const listedStocks = await this.listedStockRepository.find();
    return listedStocks;
  }

  async findByName(name: string) {
    if (name === '') return [];

    const listedStocks = await this.listedStockRepository.find({
      name: Like(`%${name}%`),
    });
    return listedStocks;
  }
}
