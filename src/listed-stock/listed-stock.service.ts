import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/user.entity';
import { Type } from 'src/stock-transaction/stock-transaction.interface';
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
    // TODO: 매수,매도 계산
    const stockTransactions = await this.stockTransactionRepository.find({
      where: {
        user,
      },
      relations: ['listedStock'],
    });

    const stockMap = stockTransactions.reduce((acc, cur) => {
      if (acc[cur.listedStock.name]) {
        acc[cur.listedStock.name] +=
          (cur.type === Type.SELL ? -1 : 1) * cur.quantity * cur.price;
      } else {
        acc[cur.listedStock.name] =
          (cur.type === Type.SELL ? -1 : 1) * cur.quantity * cur.price;
      }
      return acc;
    }, {} as { [key: string]: number });

    const totalAmount = Object.values(stockMap).reduce(
      (acc, cur) => acc + cur,
      0,
    );

    const result = Object.entries(stockMap)
      .map(([name, amount]) => ({
        name,
        amount,
        percent: Math.floor((amount * 100) / totalAmount),
      }))
      .sort((a, b) => b.percent - a.percent)
      .slice(0, 6);

    // const result = [];

    // for await (const stockItem of stockItemsSorted) {
    //   const listedStock = await this.listedStockRepository.findOne({
    //     name: stockItem.name,
    //   });

    //   if (!listedStock) {
    //     result.push({
    //       ...stockItem,
    //     });
    //   } else {
    //     result.push({
    //       ...stockItem,
    //       largeSector: listedStock.largeSector,
    //       mediumSector: listedStock.mediumSector,
    //     });
    //   }
    // }

    return result;
  }

  async getTopFiveSectors(user: UserEntity) {
    const stockTransactions = await this.stockTransactionRepository.find({
      where: {
        user,
      },
      relations: ['listedStock'],
    });

    // {[key: string(mediumSector)]: 300000}}

    const sectorMap = stockTransactions.reduce(
      (acc, cur) => {
        if (acc[cur.listedStock.largeSector]) {
          acc[cur.listedStock.largeSector] +=
            (cur.type === Type.SELL ? -1 : 1) * cur.price * cur.quantity;
        } else {
          acc[cur.listedStock.largeSector] =
            (cur.type === Type.SELL ? -1 : 1) * cur.price * cur.quantity;
        }
        return acc;
      },
      {} as {
        [key: string]: number;
      },
    );

    const totalAmount = Object.values(sectorMap).reduce(
      (acc, cur) => acc + cur,
      0,
    );

    const result = Object.entries(sectorMap)
      .map(([sector, amount]) => ({
        sector,
        amount,
        percent: Math.floor((amount * 100) / totalAmount),
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 6);

    return result;
  }
}
