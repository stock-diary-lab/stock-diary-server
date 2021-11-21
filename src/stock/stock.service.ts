import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/user.entity';
import { Between, CircularRelationsError } from 'typeorm';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StockEntity } from './stock.entity';
import { StockRepository } from './stocks.repository';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(StockRepository)
    private stockRepository: StockRepository,
  ) {}

  async createStock(createStockDto: CreateStockDto, user: UserEntity) {
    const { name, type, price, fee, quantity, reason } = createStockDto;

    const newStock = new StockEntity({
      name,
      type,
      price,
      fee,
      quantity,
      reason,
    });

    newStock.user = user;

    await this.stockRepository.save(newStock);

    return { message: 'create success' };
  }

  async findAll(startDate: Date, endDate: Date, user: UserEntity) {
    const newEndDate = new Date(endDate);
    newEndDate.setDate(new Date(endDate).getDate() + 1);

    const stocks = await this.stockRepository.find({
      where: {
        createdAt: Between(
          new Date(startDate).toISOString(),
          new Date(newEndDate).toISOString(),
        ),
        user,
      },
    });

    return stocks.reduce((acc, cur) => {
      const date = new Date(cur.createdAt);
      date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

      const localeDate = date.toLocaleDateString();

      if (acc[localeDate]) {
        acc[localeDate].push(cur);
      } else {
        acc[localeDate] = [cur];
      }

      return acc;
    }, {});
  }

  findOne(id: string) {
    return this.stockRepository.find({ where: { id } });
  }

  update(id: number, updateStockDto: UpdateStockDto) {
    this.stockRepository.update(id, updateStockDto);
  }

  deleteOne(id: number) {
    this.stockRepository.delete({ id });
  }
}
