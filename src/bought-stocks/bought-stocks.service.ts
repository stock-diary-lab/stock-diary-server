import { Injectable } from '@nestjs/common';
import { CreateBoughtStockDto } from './dto/create-bought-stock.dto';
import { UpdateBoughtStockDto } from './dto/update-bought-stock.dto';

@Injectable()
export class BoughtStocksService {
  create(createBoughtStockDto: CreateBoughtStockDto) {
    return 'This action adds a new boughtStock';
  }

  findAll() {
    return `This action returns all boughtStocks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} boughtStock`;
  }

  update(id: number, updateBoughtStockDto: UpdateBoughtStockDto) {
    return `This action updates a #${id} boughtStock`;
  }

  remove(id: number) {
    return `This action removes a #${id} boughtStock`;
  }
}
