import { Controller, Get, UseGuards, ValidationPipe } from '@nestjs/common';
import { StockIndexService } from './stock_index.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller('stock_index')
@UseGuards(AuthGuard())
@ApiBearerAuth('jwt')
export class StockIndexController {
  constructor(private readonly stockIndexService: StockIndexService) {}

  @ApiResponse({
    status: 200,
    description: '증권사 페이지 정보 리턴 api',
  })
  @ApiBearerAuth('jwt')
  @Get()
  findAll() {
    return this.stockIndexService.getStockIndex();
  }
}
