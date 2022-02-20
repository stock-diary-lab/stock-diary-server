import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFavoriteStockDto } from './dto/create-favorite-stock.dto';
import { UpdateFavoriteStockDto } from './dto/update-favorite-stock.dto';
import { FavoriteStockRepository } from './favorite-stocks.repository';
import { UserEntity } from 'src/auth/user.entity';
import { FavoriteStockEntity } from './favorite-stock.entity';
import { ListedStockRepository } from 'src/listed-stock/listed-stock.repository';

@Injectable()
export class FavoriteStockService {
  constructor(
    @InjectRepository(FavoriteStockRepository)
    @InjectRepository(ListedStockRepository)
    private favoriteStockRepository: FavoriteStockRepository,
    private listedStockRepository: ListedStockRepository,
  ) {}

  async createFavoriteStock(
    createFavoriteStockDto: CreateFavoriteStockDto,
    user: UserEntity,
  ) {
    const { isFavorite, listedStockId } = createFavoriteStockDto;

    const listedStock = await this.listedStockRepository.findOne({
      id: listedStockId,
    });

    const found = await this.favoriteStockRepository.findOne({
      listedStock,
      user,
    });

    console.log(found);
    if (found) {
      throw new Error('이미 등록된 주식정보');
    }

    const newFavoriteStock = new FavoriteStockEntity({
      isFavorite,
    });

    if (!listedStock) {
      throw new Error('상장된 주식 정보가 존재하지 않음');
    }

    newFavoriteStock.user = user;

    newFavoriteStock.listedStock = listedStock;

    await this.favoriteStockRepository.save(newFavoriteStock);

    return { message: 'create success' };
  }

  async findAll(user: UserEntity) {
    const favoriteStocks = await this.favoriteStockRepository.find({
      where: { user },
      relations: ['listedStock'],
    });

    return favoriteStocks;
  }

  async update(id: string, updateFavoriteStockDto: UpdateFavoriteStockDto) {
    await this.favoriteStockRepository.update(id, updateFavoriteStockDto);
    return { message: 'update success' };
  }

  async deleteOne(id: string) {
    await this.favoriteStockRepository.delete({ id });
    return { message: 'delete success' };
  }
}
