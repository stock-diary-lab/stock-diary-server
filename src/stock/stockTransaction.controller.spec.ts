import { Test, TestingModule } from '@nestjs/testing';
import { StockTransactionController } from './stockTransaction.controller';
import { StockTransactionService } from './stockTransaction.service';

describe('StockTransactionController', () => {
  let controller: StockTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockTransactionController],
      providers: [StockTransactionService],
    }).compile();

    controller = module.get<StockTransactionController>(
      StockTransactionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
