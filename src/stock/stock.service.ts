import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StockEntity } from './stock.entity';
import { StockRepository } from './stocks.repository';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(StockRepository)
    private StockRepository: StockRepository,
    private readonly jwtService: JwtService,
  ) {}
  /*
  create(createStockDto: CreateStockDto) {
    return 'This action adds a new stock';
  }
*/

  async createStockIfExist(
    createStockDto: CreateStockDto,
  ): Promise<{ stock: any }> {
    const { name, price, closingPrice, type, reason, isFavorite, quantity } =
      createStockDto;

    const stock = await this.StockRepository.findOne({
      name,
      price,
      closingPrice,
      type,
      reason,
      isFavorite,
      quantity,
    });

    if (!stock) {
      await this.StockRepository.createByProvider(createStockDto);
    }

    return { stock };
  }

  findAll() {
    return this.StockRepository.find();
  }

  findOne(id: number) {
    return this.StockRepository.find({ where: { id } });
  }

  update(id: number, updateStockDto: UpdateStockDto) {
    return `This action updates a #${id} stock`;
  }

  deleteOne(id: string) {
    this.StockRepository.delete({ id });
    return 'delete success';
  }
}
