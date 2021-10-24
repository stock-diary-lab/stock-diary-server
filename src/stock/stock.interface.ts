export enum Type {
  BUY = 'buy',
  SELL = 'sell',
}

export interface IStock {
  name: string;
  price: string;
  closingPrice: number;
  type: Type;
  reason: string;
  isFavorite: number;
  quantity: number;
}
