import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BoughtStocksService } from './bought-stocks.service';
import { CreateBoughtStockDto } from './dto/create-bought-stock.dto';
import { UpdateBoughtStockDto } from './dto/update-bought-stock.dto';

@Controller('bought-stocks')
export class BoughtStocksController {
  constructor(private readonly boughtStocksService: BoughtStocksService) {}

  @Post()
  create(@Body() createBoughtStockDto: CreateBoughtStockDto) {
    return this.boughtStocksService.create(createBoughtStockDto);
  }

  @Get()
  findAll() {
    return this.boughtStocksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boughtStocksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBoughtStockDto: UpdateBoughtStockDto,
  ) {
    return this.boughtStocksService.update(+id, updateBoughtStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boughtStocksService.remove(+id);
  }
}
