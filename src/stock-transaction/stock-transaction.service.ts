import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/user.entity';
import { BoughtStockRepository } from 'src/bought-stock/bought-stock.repository';
import { BoughtStockEntity } from 'src/bought-stock/entities/bought-stock.entity';
import { ListedStockRepository } from 'src/listed-stock/listed-stock.repository';
import { Between, Like } from 'typeorm';
import { CreateStockTransactionDto } from './dto/create-stock-transaction.dto';
import { UpdateStockTransactionDto } from './dto/update-stock-transaction.dto';
import { StockTransactionEntity } from './stock-transaction.entity';
import { Type } from './stock-transaction.interface';
import { StockTransactionRepository } from './stock-transactions.repository';

@Injectable()
export class StockTransactionService {
  constructor(
    @InjectRepository(StockTransactionRepository)
    @InjectRepository(ListedStockRepository)
    @InjectRepository(BoughtStockRepository)
    private stockTransactionRepository: StockTransactionRepository,
    private listedStockRepository: ListedStockRepository,
    private boughtStockRepository: BoughtStockRepository,
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

    const boughtStock = await this.boughtStockRepository.findOne({
      listedStock: { id: listedStockId },
      user,
    });
    // 매수
    if (type === Type.BUY) {
      if (boughtStock) {
        await this.boughtStockRepository.update(
          { listedStock: { id: listedStockId }, user },
          {
            quantity: Number(boughtStock.quantity) + Number(quantity),
            amount:
              Number(boughtStock.amount) + Number(quantity) * Number(price),
          },
        );
      } else {
        const newBoughtStock = new BoughtStockEntity({
          quantity,
          amount: quantity * price,
        });

        newBoughtStock.user = user;
        newBoughtStock.listedStock = listedStock;

        await this.boughtStockRepository.save(newBoughtStock);
      }
    }

    // 매도
    else if (type === Type.SELL) {
      if (!boughtStock) {
        throw new Error('매수하지 않은 주식을 매도');
      }

      if (boughtStock.quantity - Number(quantity) < 0) {
        throw new Error('매도량이 매수량보다 많음');
      }

      const avgPrice = boughtStock.amount / boughtStock.quantity;

      const income = (price - avgPrice) * quantity;
      const incomeRatio = (price - avgPrice) / 100;

      newStockTransaction.income = income;
      newStockTransaction.incomeRatio = incomeRatio;

      const updatedQuantity = boughtStock.quantity - quantity;
      const updatedAmount =
        updatedQuantity === 0 ? 0 : boughtStock.amount - quantity * price;

      await this.boughtStockRepository.update(
        { listedStock: { id: listedStockId }, user },
        {
          quantity: updatedQuantity,
          amount: updatedAmount,
        },
      );
    }

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
