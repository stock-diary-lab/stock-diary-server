import { Test, TestingModule } from '@nestjs/testing';
import { ListedStockService } from './listed-stock.service';

describe('ListedStockService', () => {
  let service: ListedStockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListedStockService],
    }).compile();

    service = module.get<ListedStockService>(ListedStockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
