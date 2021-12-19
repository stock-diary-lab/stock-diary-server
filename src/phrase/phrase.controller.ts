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
import { PhraseService } from './phrase.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { UpdatePhraseDto } from './dto/update-phrase.dto';
import { ReadPhraseDto } from './dto/read-phrase-dto';

@Controller('phrase')
@UseGuards(AuthGuard())
@ApiBearerAuth('jwt')
export class PhraseController {
  constructor(private readonly phraseService: PhraseService) {}

  @ApiResponse({
    status: 200,
  })
  @Post()
  async create(
    @Req() req,
    @Body(ValidationPipe) createPhraseDto: CreatePhraseDto,
  ) {
    return await this.phraseService.createPhrase(createPhraseDto, req.user);
  }

  @ApiResponse({
    status: 200,
    description: '명언 정보 리턴 api',
  })
  @ApiBearerAuth('jwt')
  @Get()
  findAll(@Req() req, @Query() query: ReadPhraseDto) {
    return this.phraseService.findAll(query.startDate, query.endDate, req.user);
  }

  @ApiResponse({
    status: 200,
  })
  @ApiBearerAuth('jwt')
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.phraseService.findOne(id);
  }

  @ApiResponse({
    status: 200,
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePhraseDto: UpdatePhraseDto) {
    return this.phraseService.update(id, updatePhraseDto);
  }

  @ApiResponse({
    status: 200,
  })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.phraseService.deleteOne(id);
  }
}
