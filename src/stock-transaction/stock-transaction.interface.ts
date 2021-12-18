export enum Type {
  BUY = 'buy',
  SELL = 'sell',
}

export interface IStockTransaction {
  name: string;
  type: Type;
  price: number;
  fee: number;
  quantity: number;
  reason: string;
  date: Date;
}
