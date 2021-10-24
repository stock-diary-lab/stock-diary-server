import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
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
  ): Promise<{ accessToken: string; stockName: string }> {
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

    const payload = { name, price };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken, stockName: name };
  }

  findAll() {
    return `This action returns all stock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stock`;
  }

  update(id: number, updateStockDto: UpdateStockDto) {
    return `This action updates a #${id} stock`;
  }

  remove(id: number) {
    return `This action removes a #${id} stock`;
  }
}
