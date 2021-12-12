export enum MarketType {
  KOSPI = 'kospi',
  KOSDAQ = 'kosdaq',
}

export interface IListedStock {
  id: string;
  name: string;
  industry?: string;
  market: MarketType;
}
