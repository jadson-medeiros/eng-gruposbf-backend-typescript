import { getRedis, setRedis } from '@/lib/redis-client';
import { ExchangeRate } from '@/use-cases/dto/exchange-rate';
import { CurrencyRepository } from '../currency-repository';

export class RedisCurrencyRepository implements CurrencyRepository {
    async create(amount: number, base: string, exchangeRates: ExchangeRate[]) {
        const now = new Date();
        await setRedis(`amount-${amount}-baseNdate-${base + now.toLocaleDateString()}`, JSON.stringify(exchangeRates));
    }

    async get(amount: number, base: string): Promise<ExchangeRate[] | null> {
        const now = new Date();
        const redis = await getRedis(`amount-${amount}-baseNdate-${base + now.toLocaleDateString()}`);

        if (redis) {
            return JSON.parse(redis);
        }

        return null;
    }
}