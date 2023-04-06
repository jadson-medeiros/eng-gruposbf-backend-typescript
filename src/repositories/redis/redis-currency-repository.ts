import { getRedis, setRedis } from '@/lib/redis-client';
import { ExchangeRate } from '@/use-cases/dto/exchange-rate';
import { CurrencyRepository } from '../currency-repository';

export class RedisCurrencyRepository implements CurrencyRepository {
    async create(amount: number, exchangeRares: ExchangeRate[]) {
        const now = new Date();
        await setRedis(`amount-${amount + now.toLocaleDateString()}`, JSON.stringify(exchangeRares));
    }

    async get(amount: number): Promise<ExchangeRate[] | null> {
        const now = new Date();
        const redis = await getRedis(`amount-${amount + now.toLocaleDateString()}`);

        if (redis) {
            return JSON.parse(redis);
        }

        return null;
    }
}