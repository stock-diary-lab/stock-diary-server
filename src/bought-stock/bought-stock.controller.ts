import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { BoughtStockService } from './bought-stock.service';

@Controller('bought-stock')
@UseGuards(AuthGuard())
@ApiBearerAuth('jwt')
export class BoughtStockController {
  constructor(private readonly boughtStockService: BoughtStockService) {}

  @ApiResponse({
    status: 200,
    description: 'top 5 보유주식 조회',
  })
  @Get('/top5')
  async getTopFiveStocks(@Req() req) {
    const topFiveItems = await this.boughtStockService.getTopFive(req.user);
    return topFiveItems;
  }

  @ApiResponse({
    status: 200,
    description: '보유주식 인덱스 조회',
  })
  @Get('/indexes')
  async getBoughtStockIndexes(@Req() req) {
    const boughtStockIndexes =
      await this.boughtStockService.getBoughtStockWithIndexes(req.user);

    return boughtStockIndexes;
  }
}
