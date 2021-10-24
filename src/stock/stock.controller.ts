import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
@Controller('stock')
@UseGuards(AuthGuard())
@ApiBearerAuth('jwt')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @ApiResponse({
    status: 200,
  })
  @Post()
  async create(@Body(ValidationPipe) createStockDto: CreateStockDto) {
    return await this.stockService.createStockIfExist(createStockDto);
  }

  @ApiResponse({
    status: 200,
  })
  @Get()
  findAll() {
    return this.stockService.findAll();
  }

  @ApiResponse({
    status: 200,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(+id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(+id);
  }
}
