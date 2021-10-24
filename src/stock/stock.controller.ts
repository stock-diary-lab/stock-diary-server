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
    description: '스톡 정보 리턴 api',
  })
  @ApiBearerAuth('jwt')
  @Get()
  findAll() {
    return this.stockService.findAll();
  }

  @ApiResponse({
    status: 200,
  })
  @ApiBearerAuth('jwt')
  @Get(':id')
<<<<<<< HEAD
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: number) {
=======
  findOne(@Param('id') id: string) {
>>>>>>> dd1ec90eae53c6c8657f870f6fd2d02be65db466
    return this.stockService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.update(+id, updateStockDto);
  }

  @ApiResponse({
    status: 200,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.deleteOne(+id);
  }
}
