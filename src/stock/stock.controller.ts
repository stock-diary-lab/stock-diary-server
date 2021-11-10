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
} from '@nestjs/common';
import { StockService } from './stock.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ReadStockDto } from './dto/read-stock-dto';

@Controller('stock')
@UseGuards(AuthGuard())
@ApiBearerAuth('jwt')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @ApiResponse({
    status: 200,
  })
  @Post()
  async create(
    @Req() req,
    @Body(ValidationPipe) createStockDto: CreateStockDto,
  ) {
    return await this.stockService.createStock(createStockDto, req.user);
  }

  @ApiResponse({
    status: 200,
    description: '스톡 정보 리턴 api',
  })
  @ApiBearerAuth('jwt')
  @Get()
  async findAll(@Req() req, @Query() query: ReadStockDto) {
    return await this.stockService.findAll(query.date, req.user);
  }

  @ApiResponse({
    status: 200,
  })
  @ApiBearerAuth('jwt')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(id);
  }

  @ApiResponse({
    status: 200,
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    await this.stockService.update(id, updateStockDto);
    return 'update success';
  }

  @ApiResponse({
    status: 200,
  })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.stockService.deleteOne(id);
    return 'delete success';
  }
}
