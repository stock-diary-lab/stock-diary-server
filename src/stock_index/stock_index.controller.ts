import { Controller, Get, Post } from '@nestjs/common';
import { StockIndexService } from './stock_index.service';

@Controller('stock-index')
// @UseGuards(AuthGuard())
// @ApiBearerAuth('jwt')
export class StockIndexController {
  constructor(private readonly stockIndexService: StockIndexService) {}

  // @ApiResponse({
  //   status: 200,
  //   description: '지수 정보 저장 api',
  // })
  // // @ApiBearerAuth('jwt')
  // @Post()
  // async crawlAndSave() {
  //   const indexes = await this.stockIndexService.crawlIndexes();
  //   await this.stockIndexService.saveIndexes(indexes);
  //   return { message: '크롤링 및 DB 저장 완료' };
  // }

  // @ApiResponse({
  //   status: 200,
  //   description: '지수 정보 조회 api',
  // })
  // @Get()
  // async getIndexes() {
  //   const indexes = await this.stockIndexService.getStockIndexes();
  //   return indexes;
  // }
}
