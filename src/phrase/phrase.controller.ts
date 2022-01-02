import { Controller, Get, Patch, Post } from '@nestjs/common';
import { PhraseService } from './phrase.service';
import { ApiResponse } from '@nestjs/swagger';
import { phrases } from './static/phrase';

@Controller('phrase')
export class PhraseController {
  constructor(private readonly phraseService: PhraseService) {}

  @ApiResponse({
    status: 200,
    description: '노출되는 명언 조회',
  })
  @Get()
  async getDisplayedPhrases() {
    return this.phraseService.getDisplayedPhrases();
  }

  @ApiResponse({
    status: 201,
    description: '명언 DB 저장(1회만 실행)',
  })
  @Post()
  async bulkCreate() {
    for await (const phrase of phrases) {
      this.phraseService.create(phrase);
    }

    return { message: 'bulk create success' };
  }

  @ApiResponse({
    status: 201,
    description: '노출되는 명언 바꿔주기',
  })
  @Patch()
  async updateDisplay() {
    await this.phraseService.updateDisplay();
    return { message: 'update display success' };
  }
}
