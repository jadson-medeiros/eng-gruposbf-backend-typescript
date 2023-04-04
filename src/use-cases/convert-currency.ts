import { env } from '@/env';
import { symbols } from '@/helpers/symbols';
import axios, { AxiosRequestConfig} from 'axios';

interface ExchangeRate {
  symbol: string,
  price: number;
}

const headers = {
    'apikey': env.API_KEY, // Adds an Authorization header with an access token
};

// Request configuration
const config: AxiosRequestConfig = {
    url: 'https://api.apilayer.com/exchangerates_data/',
    method: 'get',
    headers
};

export async function convertCurrencyUserCase(amount: number): Promise<ExchangeRate[]> {
    try {
        config.url = config.url + `latest?symbols=${symbols}&base=BRL`;

        const response = await axios(config);

        if (!response.data.success) {
            throw new Error('Issue with the requested.');
        }

        const exchangeRates = response.data.rates;

        if (!exchangeRates) {
            throw new Error('Exchange rate not found.');
        }

        const result: ExchangeRate[] = [];

        for(const currency in exchangeRates){
            result.push({symbol: currency, price: Number((exchangeRates[currency] * amount).toFixed(2))});
        }

        console.log(result);
        return result;
    }  catch (err){
        throw new Error('Issue with the requested exchange rate.');
    }
}