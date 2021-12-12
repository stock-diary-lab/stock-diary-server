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
  Req,
  Query,
} from '@nestjs/common';
import { FavoriteStockService } from './favorite-stock.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateFavoriteStockDto } from './dto/create-favorite-stock.dto';
import { UpdateFavoriteStockDto } from './dto/update-favorite-stock.dto';
import { ReadFavoriteStockDto } from './dto/read-favorite-stock-dto';

@Controller('favoriteStock')
@UseGuards(AuthGuard())
@ApiBearerAuth('jwt')
export class FavoriteStockController {
  constructor(private readonly favoriteStockService: FavoriteStockService) {}

  @ApiResponse({
    status: 200,
  })
  @Post()
  async create(
    @Req() req,
    @Body(ValidationPipe) createFavoriteStockDto: CreateFavoriteStockDto,
  ) {
    return await this.favoriteStockService.createFavoriteStock(
      createFavoriteStockDto,
      req.user,
    );
  }

  @ApiResponse({
    status: 200,
    description: '일지 정보 리턴 api',
  })
  @ApiBearerAuth('jwt')
  @Get()
  findAll(@Req() req, @Query() query: ReadFavoriteStockDto) {
    return this.favoriteStockService.findAll(
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
  findOne(@Param('id') id: number) {
    return this.favoriteStockService.findOne(id);
  }

  @ApiResponse({
    status: 200,
  })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateFavoriteStockDto: UpdateFavoriteStockDto,
  ) {
    return this.favoriteStockService.update(id, updateFavoriteStockDto);
  }

  @ApiResponse({
    status: 200,
  })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.favoriteStockService.deleteOne(id);
  }
}
