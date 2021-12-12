import { PartialType } from '@nestjs/swagger';
import { CreateStockTransactionDto } from './create-stockTransaction.dto';

export class UpdateStockTransactionDto extends PartialType(
  CreateStockTransactionDto,
) {}
