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
    private principleRepository: PrincipleRepository,
  ) {}

  async createPrinciple(
    createPrincipleDto: CreatePrincipleDto,
    user: UserEntity,
  ) {
    const { content, date } = createPrincipleDto;

    const newPrinciple = new PrincipleEntity({
      content,
      date,
    });

    newPrinciple.user = user;

    await this.principleRepository.save(newPrinciple);

    return { message: 'create success' };
  }

  async findAll(startDate: string, endDate: string, user: UserEntity) {
    const principles = await this.principleRepository.find({
      where: {
        date: Between(startDate, endDate),
        user,
      },
    });

    return principles.reduce((acc, cur) => {
      if (acc[cur.date]) {
        acc[cur.date].push(cur);
      } else {
        acc[cur.date] = [cur];
      }
      return acc;
    }, {});
  }

  findOne(id: number) {
    return this.principleRepository.find({ where: { id } });
  }

  update(id: number, updatePrincipleDto: UpdatePrincipleDto) {
    this.principleRepository.update(id, updatePrincipleDto);
    return { message: 'update success' };
  }

  deleteOne(id: number) {
    this.principleRepository.delete({ id });
    return { message: 'delete success' };
  }
}
