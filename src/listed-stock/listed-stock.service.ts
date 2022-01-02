import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/user.entity';
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
    private stockTransactionRepository: StockTransactionRepository,
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

  async getTopFiveStocks(user: UserEntity) {
    const stockTransactions = await this.stockTransactionRepository.find({
      user,
    });

    const totalAmount = stockTransactions.reduce(
      (acc, cur) => acc + cur.quantity * cur.price,
      0,
    );

    const stockRankings = stockTransactions.reduce((acc, cur) => {
      if (acc[cur.name]) {
        acc[cur.name] += cur.quantity * cur.price;
      } else {
        acc[cur.name] = cur.quantity * cur.price;
      }
      return acc;
    }, {} as { [key: string]: number });

    const stockItemsSorted = Object.entries(stockRankings)
      .map(([name, amount]) => ({
        name,
        percent: Math.floor((amount * 100) / totalAmount),
      }))
      .sort((a, b) => a.percent - b.percent)
      .slice(0, 6);

    const result = [];

    for await (const stockItem of stockItemsSorted) {
      const listedStock = await this.listedStockRepository.findOne({
        name: stockItem.name,
      });

      if (!listedStock) {
        result.push({
          ...stockItem,
        });
      } else {
        result.push({
          ...stockItem,
          largeSector: listedStock.largeSector,
          mediumSector: listedStock.mediumSector,
        });
      }
    }

    return result;
  }
}
