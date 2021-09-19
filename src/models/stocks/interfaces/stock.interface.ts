export type StockType = 'buy' | 'sell';

export interface IStock {
  price: number;
  closingPrice: number;
  type: StockType;
  reason: string;
  isFavorite: boolean;
  quantity: number;
  date: Date;
  isInitial: boolean;
}
