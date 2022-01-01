import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { UpdatePhraseDto } from './dto/update-phrase.dto';
import { PhraseRepository } from './phrases.repository';
import { UserEntity } from 'src/auth/user.entity';
import { PhraseEntity } from './phrase.entity';
import { Between } from 'typeorm';

@Injectable()
export class PhraseService {
  constructor(
    @InjectRepository(PhraseRepository)
    private PhraseRepository: PhraseRepository,
  ) {}

  async createPhrase(createPhraseDto: CreatePhraseDto, user: UserEntity) {
    const { name, content, date } = createPhraseDto;
    const newDate = new Date(date);
    newDate.setTime(
      newDate.getTime() + -newDate.getTimezoneOffset() * 60 * 1000,
    );

    const newPhrase = new PhraseEntity({
      name,
      content,
      date: newDate,
    });

    newPhrase.user = user;

    await this.PhraseRepository.save(newPhrase);

    return { message: 'create success' };
  }

  async findAll(startDate: Date, endDate: Date, user: UserEntity) {
    const newEndDate = new Date(endDate);
    newEndDate.setDate(new Date(endDate).getDate() + 1);

    const phrases = await this.PhraseRepository.find({
      where: {
        date: Between(
          new Date(startDate).toISOString(),
          new Date(newEndDate).toISOString(),
        ),
        user,
      },
    });

    return phrases.reduce((acc, cur) => {
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
    return this.PhraseRepository.find({ where: { id } });
  }

  update(id: number, updatePhraseDto: UpdatePhraseDto) {
    this.PhraseRepository.update(id, updatePhraseDto);
    return { message: 'update success' };
  }

  deleteOne(id: number) {
    this.PhraseRepository.delete({ id });
    return { message: 'delete success' };
  }
}
