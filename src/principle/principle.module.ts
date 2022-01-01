import { Module } from '@nestjs/common';
import { PrincipleService } from './principle.service';
import { PrincipleController } from './principle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrincipleRepository } from './principles.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PrincipleRepository]), AuthModule],
  controllers: [PrincipleController],
  providers: [PrincipleService],
})
export class PrincipleModule {}
