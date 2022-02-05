import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFavoriteStockDto } from './dto/create-favorite-stock.dto';
import { UpdateFavoriteStockDto } from './dto/update-favorite-stock.dto';
import { FavoriteStockRepository } from './favorite-stocks.repository';
import { UserEntity } from 'src/auth/user.entity';
import { FavoriteStockEntity } from './favorite-stock.entity';
import { Between } from 'typeorm';

@Injectable()
export class FavoriteStockService {
  constructor(
    @InjectRepository(FavoriteStockRepository)
    private favoriteStockRepository: FavoriteStockRepository,
  ) {}

  async createFavoriteStock(
    createFavoriteStockDto: CreateFavoriteStockDto,
    user: UserEntity,
  ) {
    const { isFavorite, date } = createFavoriteStockDto;

    const newFavoriteStock = new FavoriteStockEntity({
      isFavorite,
      date,
    });

    newFavoriteStock.user = user;

    await this.favoriteStockRepository.save(newFavoriteStock);

    return { message: 'create success' };
  }

  async findAll(startDate: string, endDate: string, user: UserEntity) {
    const favoriteStocks = await this.favoriteStockRepository.find({
      where: {
        date: Between(startDate, endDate),
        user,
      },
    });

    return favoriteStocks.reduce((acc, cur) => {
      if (acc[cur.date]) {
        acc[cur.date].push(cur);
      } else {
        acc[cur.date] = [cur];
      }
      return acc;
    }, {});
  }

  findOne(id: string) {
    return this.favoriteStockRepository.find({ where: { id } });
  }

  update(id: string, updateFavoriteStockDto: UpdateFavoriteStockDto) {
    this.favoriteStockRepository.update(id, updateFavoriteStockDto);
  }

  deleteOne(id: string) {
    this.favoriteStockRepository.delete({ id });
    return 'delete success';
  }
}
