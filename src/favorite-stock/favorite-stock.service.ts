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
    private FavoriteStockRepository: FavoriteStockRepository,
  ) {}

  async createFavoriteStock(
    createFavoriteStockDto: CreateFavoriteStockDto,
    user: UserEntity,
  ) {
    const { isFavorite, date } = createFavoriteStockDto;
    const newDate = new Date(date);
    newDate.setTime(
      newDate.getTime() + -newDate.getTimezoneOffset() * 60 * 1000,
    );

    const newFavoriteStock = new FavoriteStockEntity({
      isFavorite,
      date: newDate,
    });

    newFavoriteStock.user = user;

    await this.FavoriteStockRepository.save(newFavoriteStock);

    return { message: 'create success' };
  }

  async findAll(startDate: Date, endDate: Date, user: UserEntity) {
    const newEndDate = new Date(endDate);
    newEndDate.setDate(new Date(endDate).getDate() + 1);

    const favoriteStocks = await this.FavoriteStockRepository.find({
      where: {
        date: Between(
          new Date(startDate).toISOString(),
          new Date(newEndDate).toISOString(),
        ),
        user,
      },
    });

    return favoriteStocks.reduce((acc, cur) => {
      const localeDate = cur.date.toLocaleDateString();

      if (acc[localeDate]) {
        acc[localeDate].push(cur);
      } else {
        acc[localeDate] = [cur];
      }
      return acc;
    }, {});
  }

  findOne(id: number) {
    return this.FavoriteStockRepository.find({ where: { id } });
  }

  update(id: number, updateFavoriteStockDto: UpdateFavoriteStockDto) {
    this.FavoriteStockRepository.update(id, updateFavoriteStockDto);
  }

  deleteOne(id: number) {
    this.FavoriteStockRepository.delete({ id });
    return 'delete success';
  }
}
