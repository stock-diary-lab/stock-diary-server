import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ListedStockService } from './listed-stock.service';
import axios from 'axios';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ReadListedStockDto } from './dto/read-listed-stock.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('listed-stock')
@UseGuards(AuthGuard())
@UseGuards(AuthGuard())
@ApiBearerAuth('jwt')
export class ListedStockController {
  constructor(private readonly listedStockService: ListedStockService) {}

  @ApiResponse({
    status: 201,
    description: '주식상장 리스트 DB 저장',
  })
  @Post()
  async createAll() {
    const wiscMc = {
      1010: '에너지',
      1510: '소재',
      2010: '자본재',
      2020: '상업서비스와공급품',
      2030: '운송',
      2510: '자동차와부품',
      2520: '내구소비재와의류',
      2530: '호텔,레스토랑,레저 등',
      2550: '소매(유통)',
      2560: '교육서비스',
      3010: '식품과기본식료품소매',
      3020: '식품,음료,담배',
      3030: '가정용품과개인용품',
      3510: '건강관리장비와서비스',
      3520: '제약과생물공학',
      4010: '은행',
      4020: '증권',
      4030: '다각화된금융',
      4040: '보험',
      4050: '부동산',
      4510: '소프트웨어와서비스',
      4520: '기술하드웨어와장비',
      4530: '반도체와반도체장비',
      4535: '전자와 전기제품',
      4540: '디스플레이',
      5010: '전기통신서비스',
      5020: '미디어와엔터테인먼트',
      5510: '유틸리티',
    };

    const date = new Date();
    date.setDate(date.getDate() - 1);
    const dateStr = `${date.getFullYear()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;

    let list = [];

    for await (const code of Object.keys(wiscMc)) {
      const url = `http://www.wiseindex.com/Index/GetIndexComponets?ceil_yn=0&dt=${dateStr}&sec_cd=G${code}`;

      const response = await axios.get(url);

      list = list.concat(response.data.list);
    }

    // let list: { korSecnNm: string; shotnIsin: string }[] = [];

    // const indexes = new Array(10).fill(0).map((el, idx) => idx);

    // for await (const index of indexes) {
    //   const response = await axios.get(
    //     `http://api.seibro.or.kr/openapi/service/StockSvc/getShotnByMartN1?serviceKey=BVfR%2Bg6sL2jwQ6QaB635m4cUlqHYkPIqYVveWZGrndWYl1J8zD6dKzzm4gWmk%2BLTUO%2BJweOz81pfkd2gAogy9A%3D%3D&pageNo=${
    //       index + 1
    //     }&numOfRows=100&martTpcd=11`,
    //   );

    //   list = list.concat(response.data.response.body.items.item);
    // }
    await this.listedStockService.createAll(list);

    return { message: 'create success' };
  }

  @ApiResponse({
    status: 200,
    description: '주식상장 리스트 조회',
  })
  @Get()
  getAll(@Req() req, @Query() query: ReadListedStockDto) {
    return this.listedStockService.findByName(query.name);
  }

  @ApiResponse({
    status: 200,
    description: '상위 5개 보유주식 조회',
  })
  @Get('/top')
  getTopStocks(@Req() req) {
    return this.listedStockService.getTopFiveStocks(req.user);
  }

  @ApiResponse({
    status: 200,
    description: '상위 5개 보유섹터 조회',
  })
  @Get('/top-sectors')
  getTopSectors(@Req() req) {
    return this.listedStockService.getTopFiveSectors(req.user);
  }
}
