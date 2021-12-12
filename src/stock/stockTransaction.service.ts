import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/user.entity';
import { Between, CircularRelationsError } from 'typeorm';
import { CreateStockTransactionDto } from './dto/create-stockTransaction.dto';
import { UpdateStockTransactionDto } from './dto/update-stockTransaction.dto';
import { StockTransactionEntity } from './stockTransaction.entity';
import { StockTransactionRepository } from './stocksTransactions.repository';

@Injectable()
export class StockTransactionService {
  constructor(
    @InjectRepository(StockTransactionRepository)
    private stockTransactionRepository: StockTransactionRepository,
  ) {}

  async createStockTransaction(
    createStockTransactionDto: CreateStockTransactionDto,
    user: UserEntity,
  ) {
    const { name, type, price, fee, quantity, reason, date } =
      createStockTransactionDto;
    const newDate = new Date(date);

    newDate.setTime(
      newDate.getTime() + -newDate.getTimezoneOffset() * 60 * 1000,
    );

    const newStockTransaction = new StockTransactionEntity({
      name,
      type,
      price,
      fee,
      quantity,
      reason,
      date: newDate,
    });

    newStockTransaction.user = user;

    await this.stockTransactionRepository.save(newStockTransaction);

    return { message: 'create success' };
  }

  async findAll(startDate: Date, endDate: Date, user: UserEntity) {
    const newEndDate = new Date(endDate);
    newEndDate.setDate(new Date(endDate).getDate() + 1);

    const stockTransactions = await this.stockTransactionRepository.find({
      where: {
        date: Between(
          new Date(startDate).toISOString(),
          new Date(newEndDate).toISOString(),
        ),
        user,
      },
    });

    return stockTransactions.reduce((acc, cur) => {
      const date = new Date(cur.date);
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
    return this.stockTransactionRepository.find({ where: { id } });
  }

  update(id: number, updateStockTransactionDto: UpdateStockTransactionDto) {
    const { date, ...others } = updateStockTransactionDto;

    this.stockTransactionRepository.update(id, { ...others });
  }

  deleteOne(id: number) {
    this.stockTransactionRepository.delete({ id });
  }
}
