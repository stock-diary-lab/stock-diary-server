import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/user.entity';
import { Between } from 'typeorm';
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

  findAll(date: Date, user: UserEntity) {
    const nextDate = new Date(date);
    nextDate.setDate(new Date(date).getDate() + 1);

    return this.stockRepository.find({
      where: {
        createdAt: Between(
          new Date(date).toISOString(),
          nextDate.toISOString(),
        ),
        user,
      },
    });
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
