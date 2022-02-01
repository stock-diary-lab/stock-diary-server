import { Test, TestingModule } from '@nestjs/testing';
import { BoughtStocksService } from './bought-stocks.service';

describe('BoughtStocksService', () => {
  let service: BoughtStocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoughtStocksService],
    }).compile();

    service = module.get<BoughtStocksService>(BoughtStocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
