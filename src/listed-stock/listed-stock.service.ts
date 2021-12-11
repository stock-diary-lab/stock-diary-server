import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';
import { ListedStockEntity } from './entities/listed-stock.entity';
import { MarketType } from './listed-stock.interface';
import { ListedStockRepository } from './listed-stock.repository';

@Injectable()
export class ListedStockService {
  constructor(
    @InjectRepository(ListedStockRepository)
    private listedStockRepository: ListedStockRepository,
  ) {}

  async createAll(list: { korSecnNm: string; shotnIsin: string }[]) {
    for await (const { korSecnNm, shotnIsin } of list) {
      const found = await this.listedStockRepository.findOne({ id: shotnIsin });
      if (found) return;

      const newListedStock = new ListedStockEntity({
        id: shotnIsin,
        name: korSecnNm,
        market: MarketType.KOSPI,
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
