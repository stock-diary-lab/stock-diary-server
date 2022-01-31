import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/user.entity';
import { ListedStockRepository } from 'src/listed-stock/listed-stock.repository';
import { Between, Like } from 'typeorm';
import { CreateStockTransactionDto } from './dto/create-stock-transaction.dto';
import { UpdateStockTransactionDto } from './dto/update-stock-transaction.dto';
import { StockTransactionEntity } from './stock-transaction.entity';
import { StockTransactionRepository } from './stock-transactions.repository';

@Injectable()
export class StockTransactionService {
  constructor(
    @InjectRepository(StockTransactionRepository)
    @InjectRepository(ListedStockRepository)
    private stockTransactionRepository: StockTransactionRepository,
    private listedStockRepository: ListedStockRepository,
  ) {}

  async createStockTransaction(
    createStockTransactionDto: CreateStockTransactionDto,
    user: UserEntity,
  ) {
    const { listedStockId, type, price, fee, quantity, reason, date } =
      createStockTransactionDto;
    const newDate = new Date(date);

    newDate.setTime(
      newDate.getTime() + -newDate.getTimezoneOffset() * 60 * 1000,
    );

    const newStockTransaction = new StockTransactionEntity({
      type,
      price,
      fee,
      quantity,
      reason,
      date: newDate,
    });

    newStockTransaction.user = user;

    const listedStock = await this.listedStockRepository.findOne({
      id: listedStockId,
    });

    if (!listedStock) {
      throw new Error('주식 종목코드가 잘못되었음');
    }

    newStockTransaction.listedStock = listedStock;

    // 매수
    // 매도

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
      relations: ['listedStock'],
    });

    return stockTransactions.reduce((acc, cur) => {
      const date = new Date(cur.date);
      date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

      const localeDate = date.toLocaleDateString('ko-kr');

      if (acc[localeDate]) {
        acc[localeDate].push(cur);
      } else {
        acc[localeDate] = [cur];
      }

      return acc;
    }, {});
  }

  async findBySearchWord(searchWord: string, user: UserEntity) {
    if (searchWord === '') return [];
    return this.stockTransactionRepository.find({
      where: [
        { reason: Like(`%${searchWord}%`), user },
        {
          listedStock: {
            name: Like(`%${searchWord}%`),
          },
          user,
        },
      ],
      relations: ['listedStock'],
    });
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
