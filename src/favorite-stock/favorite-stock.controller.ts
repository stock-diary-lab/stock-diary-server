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
} from '@nestjs/common';
import { FavoriteStockService } from './favorite-stock.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateFavoriteStockDto } from './dto/create-favorite-stock.dto';
import { UpdateFavoriteStockDto } from './dto/update-favorite-stock.dto';

@Controller('favorite-stock')
@UseGuards(AuthGuard())
@ApiBearerAuth('jwt')
export class FavoriteStockController {
  constructor(private readonly favoriteStockService: FavoriteStockService) {}

  @ApiResponse({
    status: 201,
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
    description: '선호종목 정보 리턴 api',
  })
  @ApiBearerAuth('jwt')
  @Get()
  findAll(@Req() req) {
    return this.favoriteStockService.findAll(req.user);
  }

  @ApiResponse({
    status: 200,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFavoriteStockDto: UpdateFavoriteStockDto,
  ) {
    return this.favoriteStockService.update(id, updateFavoriteStockDto);
  }

  @ApiResponse({
    status: 200,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoriteStockService.deleteOne(id);
  }
}
