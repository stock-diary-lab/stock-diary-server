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
import { PrincipleService } from './principle.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreatePrincipleDto } from './dto/create-principle.dto';
import { UpdatePrincipleDto } from './dto/update-principle.dto';

@Controller('principle')
@UseGuards(AuthGuard())
@ApiBearerAuth('jwt')
export class PrincipleController {
  constructor(private readonly principleService: PrincipleService) {}

  @ApiResponse({
    status: 201,
  })
  @Post()
  async create(
    @Req() req,
    @Body(ValidationPipe) createPrincipleDto: CreatePrincipleDto,
  ) {
    return await this.principleService.createPrinciple(
      createPrincipleDto,
      req.user,
    );
  }

  @ApiResponse({
    status: 200,
    description: '원칙 정보 리턴 api',
  })
  @ApiBearerAuth('jwt')
  @Get()
  findAll(@Req() req) {
    return this.principleService.findAll(req.user);
  }

  @ApiResponse({
    status: 200,
  })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePrincipleDto: UpdatePrincipleDto,
  ) {
    return this.principleService.update(id, updatePrincipleDto);
  }

  @ApiResponse({
    status: 200,
  })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.principleService.deleteOne(id);
  }
}
