import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePrincipleDto } from './dto/create-principle.dto';
import { UpdatePrincipleDto } from './dto/update-principle.dto';
import { PrincipleRepository } from './principles.repository';
import { UserEntity } from 'src/auth/user.entity';
import { PrincipleEntity } from './principle.entity';
import { Between } from 'typeorm';

@Injectable()
export class PrincipleService {
  constructor(
    @InjectRepository(PrincipleRepository)
    private PrincipleRepository: PrincipleRepository,
  ) {}

  async createPrinciple(
    createPrincipleDto: CreatePrincipleDto,
    user: UserEntity,
  ) {
    const { content, date } = createPrincipleDto;
    const newDate = new Date(date);
    newDate.setTime(
      newDate.getTime() + -newDate.getTimezoneOffset() * 60 * 1000,
    );

    const newPrinciple = new PrincipleEntity({
      content,
      date: newDate,
    });

    newPrinciple.user = user;

    await this.PrincipleRepository.save(newPrinciple);

    return { message: 'create success' };
  }

  async findAll(startDate: Date, endDate: Date, user: UserEntity) {
    const newEndDate = new Date(endDate);
    newEndDate.setDate(new Date(endDate).getDate() + 1);

    const principles = await this.PrincipleRepository.find({
      where: {
        date: Between(
          new Date(startDate).toISOString(),
          new Date(newEndDate).toISOString(),
        ),
        user,
      },
    });

    return principles.reduce((acc, cur) => {
      const localeDate = cur.date.toLocaleDateString('ko-kr');

      if (acc[localeDate]) {
        acc[localeDate].push(cur);
      } else {
        acc[localeDate] = [cur];
      }
      return acc;
    }, {});
  }

  findOne(id: number) {
    return this.PrincipleRepository.find({ where: { id } });
  }

  update(id: number, updatePrincipleDto: UpdatePrincipleDto) {
    this.PrincipleRepository.update(id, updatePrincipleDto);
    return { message: 'update success' };
  }

  deleteOne(id: number) {
    this.PrincipleRepository.delete({ id });
    return { message: 'delete success' };
  }
}
