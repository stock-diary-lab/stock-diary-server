import { PartialType } from '@nestjs/swagger';
import { CreateBoughtStockDto } from './create-bought-stock.dto';

export class UpdateBoughtStockDto extends PartialType(CreateBoughtStockDto) {}
