import { Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ListedStockService } from './listed-stock.service';
import axios from 'axios';
import { ApiResponse } from '@nestjs/swagger';
import { ReadListedStockDto } from './dto/read-listed-stock.dto';

@Controller('listed-stock')
export class ListedStockController {
  constructor(private readonly listedStockService: ListedStockService) {}

  @ApiResponse({
    status: 201,
    description: '주식상장 리스트 DB 저장',
  })
  @Post()
  async create() {
    let list: { korSecnNm: string; shotnIsin: string }[] = [];

    const indexes = new Array(10).fill(0).map((el, idx) => idx);

    for await (const index of indexes) {
      const response = await axios.get(
        `http://api.seibro.or.kr/openapi/service/StockSvc/getShotnByMartN1?serviceKey=BVfR%2Bg6sL2jwQ6QaB635m4cUlqHYkPIqYVveWZGrndWYl1J8zD6dKzzm4gWmk%2BLTUO%2BJweOz81pfkd2gAogy9A%3D%3D&pageNo=${
          index + 1
        }&numOfRows=100&martTpcd=11`,
      );

      list = list.concat(response.data.response.body.items.item);
    }

    await this.listedStockService.createAll(list);

    return { message: 'create success' };
  }

  @ApiResponse({
    status: 200,
    description: '주식상장 리스트 조회',
  })
  @Get()
  findAll(@Req() req, @Query() query: ReadListedStockDto) {
    return this.listedStockService.findByName(query.name);
  }
}
