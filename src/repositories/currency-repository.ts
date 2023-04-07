import { ExchangeRate } from '@/use-cases/dto/exchange-rate';

export interface CurrencyRepository{
  create(amount: number, base: string, exchangeRates: ExchangeRate[]): Promise<void>;
  get(amount: number, base: string): Promise<ExchangeRate[] | null> ;
}