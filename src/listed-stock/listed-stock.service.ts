import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListedStockEntity } from './entities/listed-stock.entity';
import { MarketType } from './listed-stock.interface';
import { ListedStockRepository } from './listed-stock.repository';

@Injectable()
export class ListedStockService {
  constructor(
    @InjectRepository(ListedStockRepository)
    private listedStockRepository: ListedStockRepository,
  ) {}

  async createAll(list: { korSencNm: string; shortnIsin: string }[]) {
    for await (const { korSencNm, shortnIsin } of list) {
      // const found = await this.listedStockRepository.findOne({ id: korSencNm });
      // if (found) return;

      const newListedStock = new ListedStockEntity({
        id: korSencNm,
        name: shortnIsin,
        market: MarketType.KOSPI,
      });

      await this.listedStockRepository.save(newListedStock);
    }
  }

  async findAll() {
    const listedStocks = await this.listedStockRepository.find();
    return listedStocks;
  }
}
