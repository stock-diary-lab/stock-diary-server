import { Test, TestingModule } from '@nestjs/testing';
import { BoughtStocksController } from './bought-stocks.controller';
import { BoughtStocksService } from './bought-stocks.service';

describe('BoughtStocksController', () => {
  let controller: BoughtStocksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoughtStocksController],
      providers: [BoughtStocksService],
    }).compile();

    controller = module.get<BoughtStocksController>(BoughtStocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
