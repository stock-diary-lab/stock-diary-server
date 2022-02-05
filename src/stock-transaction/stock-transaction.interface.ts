export enum Type {
  BUY = 'buy',
  SELL = 'sell',
}

export interface IStockTransaction {
  type: Type;
  price: number;
  fee: number;
  quantity: number;
  reason: string;
  date: string;
  income: number;
  incomeRatio: number;
}
