import { ExchangeRate } from '@/use-cases/dto/exchange-rate';

export interface CurrencyRepository{
  create(amount: number, exchangeRares: ExchangeRate[]): Promise<void>;
  get(amount: number): Promise<ExchangeRate[] | null> ;
}