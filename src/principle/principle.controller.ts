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
import { PrincipleService } from './principle.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreatePrincipleDto } from './dto/create-principle.dto';
import { UpdatePrincipleDto } from './dto/update-principle.dto';
import { ReadPrincipleDto } from './dto/read-principle-dto';

@Controller('principle')
@UseGuards(AuthGuard())
@ApiBearerAuth('jwt')
export class PrincipleController {
  constructor(private readonly principleService: PrincipleService) {}

  @ApiResponse({
    status: 200,
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
  findAll(@Req() req, @Query() query: ReadPrincipleDto) {
    return this.principleService.findAll(
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
    return this.principleService.findOne(id);
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
