export enum Type {
  BUY = 'buy',
  SELL = 'sell',
}

export interface IStock {
  name: string;
  type: Type;
  price: string;
  fee: number;
  quantity: number;
  reason: string;
}
