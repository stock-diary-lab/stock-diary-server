import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('stock')
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
    description: '스톡 정보 리턴 api',
  })
  @ApiBearerAuth('jwt')
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.stockService.findAll();
  }

  @ApiResponse({
    status: 200,
  })
  @ApiBearerAuth('jwt')
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: number) {
    return this.stockService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
  })
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(+id, updateStockDto);
  }

  @ApiResponse({
    status: 200,
  })
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.stockService.deleteOne(+id);
  }
}
