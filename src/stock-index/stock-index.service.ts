import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import * as puppeteer from 'puppeteer';
// import { StockIndexEntity } from './stock_index.entity';
import { StockIndexRepository } from './stock-indexes.repository';

@Injectable()
export class StockIndexService {
  constructor(
    @InjectRepository(StockIndexRepository)
    private stockIndexRepository: StockIndexRepository,
  ) {}

  async getStockIndexes() {
    const stockIndexes = await this.stockIndexRepository.find({});

    return stockIndexes.map((stockIndex) => {
      delete stockIndex.createdAt;
      delete stockIndex.updatedAt;
      delete stockIndex.id;
      return stockIndex;
    });
  }

  // async getStockIndex() {
  //   const today = new Date();
  //   const year = today.getFullYear();
  //   const month = ((today.getMonth() + 1) % 12).toString().padStart(2, '0');
  //   const date = today.getDate().toString().padStart(2, '0');
  //   const dateStr = `${year}${month}${date}`;
  //   const result = [];

  //   try {
  //     for await (const index of indexes) {
  //       const { data } = await axios.get(
  //         `https://api.finance.naver.com/siseJson.naver?symbol=${index}&requestType=1&startTime=20220107&endTime=20220107&timeframe=day`,
  //       );
  //       // ['날짜', '시가', '고가', '저가', '종가', '거래량', '외국인소진율']
  //       const parsed = JSON.parse(
  //         data.replace(/\n|\t|\"| /g, '').replace(/\'/g, '"'),
  //       );
  //       result.push({ index, value: parsed[1][4] });
  //     }

  //     return result;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // async crawlIndexes() {
  //   try {
  //     const browser = await puppeteer.launch({ headless: true });
  //     const page = await browser.newPage();
  //     await page.goto('https://finance.naver.com/sise/', {
  //       waitUntil: 'networkidle0',
  //     });

  //     const koreans = await page.$$eval('.lft .tab li', (listItems) =>
  //       listItems.slice(0, 2).map((listItem) => {
  //         const indexName = listItem.querySelector('span.blind').textContent;
  //         const currentValue = listItem.querySelector('span.num').textContent;
  //         const [diff, percent] = listItem
  //           .querySelector('span.num_s')
  //           .textContent.split(' ');

  //         return {
  //           indexName,
  //           currentValue,
  //           diff,
  //           percent: percent.replace(/(.*\%)(.*)/g, '$1'),
  //         };
  //       }),
  //     );

  //     await page.goto('https://finance.naver.com/world');

  //     const foreigns = await page.$$eval('table#americaIndex tr', (tableRows) =>
  //       tableRows
  //         .map((tableRow) => {
  //           const [nationEl, indexNameEl, currentValueEl, diffEl, percentEl] =
  //             tableRow.children;
  //           const [_, indexName, currentValue, diff, percent] = [
  //             nationEl.textContent,
  //             indexNameEl.textContent,
  //             currentValueEl.textContent.replace(/\,/g, ''),
  //             diffEl.textContent.replace(/\,/g, ''),
  //             percentEl.textContent.replace(/\,/g, ''),
  //           ];

  //           return { indexName, currentValue, diff, percent };
  //         })
  //         .filter((_, index) => index !== 0),
  //     );

  //     await browser.close();
  //     return [...koreans, ...foreigns];
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  // async saveIndexes(
  //   indexes: {
  //     indexName: string;
  //     currentValue: string;
  //     diff: string;
  //     percent: string;
  //   }[],
  // ) {
  //   for await (const index of indexes) {
  //     const found = await this.stockIndexRepository.findOne({
  //       name: index.indexName,
  //     });

  //     if (found) {
  //       await this.stockIndexRepository.update(
  //         { name: index.indexName },
  //         { flucRate: index.percent, point: index.currentValue },
  //       );
  //     } else {
  //       const newStockIndex = new StockIndexEntity({
  //         name: index.indexName,
  //         point: index.currentValue,
  //         flucRate: index.percent,
  //       });
  //       await this.stockIndexRepository.save(newStockIndex);
  //     }
  //   }
  // }
}
