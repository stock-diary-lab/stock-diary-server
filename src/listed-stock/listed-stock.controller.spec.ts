import { Test, TestingModule } from '@nestjs/testing';
import { ListedStockController } from './listed-stock.controller';
import { ListedStockService } from './listed-stock.service';

describe('ListedStockController', () => {
  let controller: ListedStockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListedStockController],
      providers: [ListedStockService],
    }).compile();

    controller = module.get<ListedStockController>(ListedStockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
