import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/user.entity';
import { BoughtStockRepository } from 'src/bought-stock/bought-stock.repository';
import { BoughtStockEntity } from 'src/bought-stock/entities/bought-stock.entity';
import { ListedStockRepository } from 'src/listed-stock/listed-stock.repository';
import { Between, Like } from 'typeorm';
import { CreateStockTransactionDto } from './dto/create-stock-transaction.dto';
import { UpdateStockTransactionDto } from './dto/update-stock-transaction.dto';
import { ERRORCODES } from './error/create-stock-transaction.error';
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

    const newStockTransaction = new StockTransactionEntity({
      type,
      price,
      fee,
      quantity,
      reason,
      date,
    });

    newStockTransaction.user = user;

    const listedStock = await this.listedStockRepository.findOne({
      id: listedStockId,
    });

    if (!listedStock) {
      // throw new Error('주식 종목코드가 잘못되었음');
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: ERRORCODES.INVALID_STOCK_TICKER,
        },
        HttpStatus.BAD_REQUEST,
      );
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
        // throw new Error('매수하지 않은 주식을 매도');
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: ERRORCODES.NOT_FOUND_BUYING_TRANSACTION,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (boughtStock.quantity - Number(quantity) < 0) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: ERRORCODES.LESS_THAN_BUYING_QUANTITY,
          },
          HttpStatus.BAD_REQUEST,
        );
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

  async findAll(startDate: string, endDate: string, user: UserEntity) {
    const stockTransactions = await this.stockTransactionRepository.find({
      where: {
        date: Between(startDate, endDate),
        user,
      },
      relations: ['listedStock'],
    });

    return stockTransactions.reduce((acc, cur) => {
      if (acc[cur.date]) {
        acc[cur.date].push(cur);
      } else {
        acc[cur.date] = [cur];
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

  async update(
    id: number,
    updateStockTransactionDto: UpdateStockTransactionDto,
    user: UserEntity,
  ) {
    const { date, listedStockId, type, quantity, price, ...others } =
      updateStockTransactionDto;

    const listedStock = await this.listedStockRepository.findOne({
      id: listedStockId,
    });

    if (!listedStock) {
      // throw new Error('주식 종목코드가 잘못되었음');
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: ERRORCODES.INVALID_STOCK_TICKER,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

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

      return await this.stockTransactionRepository.update(id, {
        quantity,
        price,
        ...others,
      });
    }

    // 매도
    else if (type === Type.SELL) {
      if (!boughtStock) {
        // throw new Error('매수하지 않은 주식을 매도');
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: ERRORCODES.NOT_FOUND_BUYING_TRANSACTION,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (boughtStock.quantity - Number(quantity) < 0) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: ERRORCODES.LESS_THAN_BUYING_QUANTITY,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const avgPrice = boughtStock.amount / boughtStock.quantity;

      const income = (price - avgPrice) * quantity;
      const incomeRatio = (price - avgPrice) / 100;

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

      return await this.stockTransactionRepository.update(id, {
        quantity,
        price,
        income,
        incomeRatio,
        ...others,
      });
    }
  }

  deleteOne(id: number) {
    this.stockTransactionRepository.delete({ id });
  }
}
