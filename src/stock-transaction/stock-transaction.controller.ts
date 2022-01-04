import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  Query,
  Req,
} from '@nestjs/common';
import { StockTransactionService } from './stock-transaction.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateStockTransactionDto } from './dto/create-stock-transaction.dto';
import { UpdateStockTransactionDto } from './dto/update-stock-transaction.dto';
import { ReadStockTransactionDto } from './dto/read-stock-transaction-dto';

@Controller('stock-transaction')
@UseGuards(AuthGuard())
@ApiBearerAuth('jwt')
export class StockTransactionController {
  constructor(
    private readonly stockTransactionService: StockTransactionService,
  ) {}

  @ApiResponse({
    status: 200,
  })
  @Post()
  async create(
    @Req() req,
    @Body(ValidationPipe) createStockTransactionDto: CreateStockTransactionDto,
  ) {
    return await this.stockTransactionService.createStockTransaction(
      createStockTransactionDto,
      req.user,
    );
  }

  @ApiResponse({
    status: 200,
    description: '스톡 정보 리턴 api',
  })
  @ApiBearerAuth('jwt')
  @Get()
  async findAll(@Req() req, @Query() query: ReadStockTransactionDto) {
    return await this.stockTransactionService.findAll(
      query.startDate,
      query.endDate,
      req.user,
    );
  }

  @ApiResponse({
    status: 200,
  })
  @ApiBearerAuth('jwt')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockTransactionService.findOne(id);
  }

  @ApiResponse({
    status: 200,
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateStockTransactionDto: UpdateStockTransactionDto,
  ) {
    await this.stockTransactionService.update(id, updateStockTransactionDto);
    return { message: 'update success' };
  }

  @ApiResponse({
    status: 200,
  })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.stockTransactionService.deleteOne(id);
    return 'delete success';
  }
}
