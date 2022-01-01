import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { PhraseEntity } from './entities/phrase.entity';
import { PhraseRepository } from './phrase.repository';

@Injectable()
export class PhraseService {
  constructor(
    @InjectRepository(PhraseRepository)
    private phraseRepository: PhraseRepository,
  ) {}

  async getDisplayedPhrases() {
    const phrases = await this.phraseRepository.find({ display: true });
    return phrases;
  }

  async create(createPhraseDto: Partial<CreatePhraseDto>) {
    const newPhrase = new PhraseEntity({
      ...createPhraseDto,
      display: false,
    });

    await this.phraseRepository.save(newPhrase);
  }

  async updateDisplay() {
    const phrasesBeingDisplayed = await this.phraseRepository.find({
      display: true,
    });

    const LENGTH = 135;

    const phraseIdsBeingDisplayed = phrasesBeingDisplayed.map(
      (phrase) => phrase.id,
    );

    const getRandomInt = () => Math.floor(Math.random() * LENGTH) + 1;

    const randomIntArr = [];

    while (randomIntArr.length < 2) {
      const randomInt = getRandomInt();
      if (
        phraseIdsBeingDisplayed.includes(randomInt) ||
        randomIntArr.includes(randomInt)
      ) {
        continue;
      } else {
        randomIntArr.push(randomInt);
      }
    }

    for await (const id of phraseIdsBeingDisplayed) {
      await this.phraseRepository.update({ id }, { display: false });
    }

    for await (const id of randomIntArr) {
      await this.phraseRepository.update({ id }, { display: true });
    }
  }
}
