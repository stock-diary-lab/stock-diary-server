import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/user.entity';
import { MoreThan } from 'typeorm';
import { BoughtStockRepository } from './bought-stock.repository';

@Injectable()
export class BoughtStockService {
  constructor(
    @InjectRepository(BoughtStockRepository)
    private boughtStockRepository: BoughtStockRepository,
  ) {}

  async getTopFive(user: UserEntity) {
    const boughtStocks = await this.boughtStockRepository.find({
      where: { user, quantity: MoreThan(0) },
      relations: ['listedStock'],
    });

    const totalAmount = boughtStocks.reduce((acc, cur) => acc + cur.amount, 0);

    const sectorMap = boughtStocks.reduce((acc, cur) => {
      if (acc[cur.listedStock.largeSector]) {
        acc[cur.listedStock.largeSector] += cur.amount;
      } else {
        acc[cur.listedStock.largeSector] = cur.amount;
      }
      return acc;
    }, {} as { [key: string]: number });

    const topFiveStocks = boughtStocks
      .map(({ listedStock, amount }) => ({
        name: listedStock.name,
        amount,
        percent: Math.floor((amount * 100) / totalAmount),
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 6);

    const topFiveSectors = Object.entries(sectorMap)
      .map(([sector, amount]) => ({
        sector,
        amount,
        percent: Math.floor((amount * 100) / totalAmount),
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 6);

    return { topFiveStocks, topFiveSectors };
  }
}
