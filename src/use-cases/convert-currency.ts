import { env } from '@/config/env';
import { symbols } from '@/helpers/symbols';
import axios, { AxiosRequestConfig} from 'axios';
import { ExchangeRateNotFoundError } from './errors/exchange-rate-not-found';
import { getRedis, setRedis } from '@/lib/redis-client';

interface ExchangeRate {
  symbol: string,
  price: number;
}

const headers = {
    'apikey': env.API_KEY, // Adds an Authorization header with an access token
};

const now = new Date();

// Request configuration
const config: AxiosRequestConfig = {
    url: 'https://api.apilayer.com/exchangerates_data/',
    method: 'get',
    headers
};

async function getExchangeRates(amount: number): Promise<ExchangeRate[] | null> {

    const redis = await getRedis(`amount-${amount + now.toLocaleDateString()}`);

    if (redis) {
        return JSON.parse(redis);
    }

    return null;
}

async function setExchangeRates(amount: number, exchangeRares: ExchangeRate[]) {
    await setRedis(`amount-${amount + now.toLocaleDateString()}`, JSON.stringify(exchangeRares));
}

export async function convertCurrencyUserCase(amount: number): Promise<ExchangeRate[]> {
    try {

        const checkCacheCurrency = await getExchangeRates(amount);

        if (checkCacheCurrency) {
            return checkCacheCurrency;
        }

        config.url = config.url + `latest?symbols=${symbols}&base=BRL`;

        const response = await axios(config);

        if (!response.data.success) {
            throw new Error('Issue with the requested.');
        }

        const exchangeRates = response.data.rates;

        if (!exchangeRates) {
            throw new ExchangeRateNotFoundError();
        }

        const result: ExchangeRate[] = [];

        for(const currency in exchangeRates){
            result.push({symbol: currency, price: Number((exchangeRates[currency] * amount).toFixed(2))});
        }

        await setExchangeRates(amount, result);

        return result;
    }  catch (err){
        throw new Error('Issue with the requested exchange rate.');
    }
}