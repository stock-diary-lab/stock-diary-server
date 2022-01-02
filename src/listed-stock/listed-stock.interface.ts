export enum MarketType {
  KOSPI = 'kospi',
  KOSDAQ = 'kosdaq',
}

export interface IListedStock {
  id: string;
  name: string;
  largeSector?: string;
  mediumSector?: string;
  market: MarketType;
}
