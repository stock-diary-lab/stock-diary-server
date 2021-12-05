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
import { DiaryService } from './diary.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
import { ReadDiaryDto } from './dto/read-diary-dto';

@Controller('diary')
@UseGuards(AuthGuard())
@ApiBearerAuth('jwt')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @ApiResponse({
    status: 200,
  })
  @Post()
  async create(
    @Req() req,
    @Body(ValidationPipe) createDiaryDto: CreateDiaryDto,
  ) {
    return await this.diaryService.createDiary(createDiaryDto, req.user);
  }

  @ApiResponse({
    status: 200,
    description: '일지 정보 리턴 api',
  })
  @ApiBearerAuth('jwt')
  @Get()
  findAll(@Req() req, @Query() query: ReadDiaryDto) {
    return this.diaryService.findAll(query.startDate, query.endDate, req.user);
  }

  @ApiResponse({
    status: 200,
  })
  @ApiBearerAuth('jwt')
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.diaryService.findOne(id);
  }

  @ApiResponse({
    status: 200,
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDiaryDto: UpdateDiaryDto) {
    return this.diaryService.update(id, updateDiaryDto);
  }

  @ApiResponse({
    status: 200,
  })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.diaryService.deleteOne(id);
  }
}
