import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
//import { CreateStockDto } from './dto/create-stock.dto';
//import { UpdateStockDto } from './dto/update-stock.dto';
import { StockIndexEntity } from './stock_index.entity';
//import { StockRepository } from './stocks.repository';
const axios = require('axios');

@Injectable()
export class StockIndexService {
  async getStockIndex() {
    try {
      const response = await axios.get(
        'https://api.finance.naver.com/siseJson.naver?symbol=KOSPI&requestType=1&startTime=20201128&endTime=20201228&timeframe=day',
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
}
