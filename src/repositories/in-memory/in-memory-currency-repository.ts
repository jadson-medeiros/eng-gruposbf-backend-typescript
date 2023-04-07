import { ExchangeRate } from '@/use-cases/dto/exchange-rate';
import { CurrencyRepository } from '../currency-repository';

interface ExchangeRateInMemory {
  key: string;
  value: ExchangeRate[];
}

export class InMemoryCurrencyRepository implements CurrencyRepository {
    public items: ExchangeRateInMemory[] = [];

    async create(amount: number, exchangeRates: ExchangeRate[]) {
        const now = new Date();
        const exchangeRate = {
            key: `amount-${amount + now.toLocaleDateString()}`, value: exchangeRates
        };

        this.items.push(exchangeRate);
    }

    async get(amount: number): Promise<ExchangeRate[] | null> {

        const now = new Date();
        const rate = this.items.find(rate => rate.key === `amount-${amount + now.toLocaleDateString()}`);

        if(!rate){
            return null;
        }

        return rate.value;
    }

}