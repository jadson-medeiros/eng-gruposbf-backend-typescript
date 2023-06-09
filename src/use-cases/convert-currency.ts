import { env } from '@/config/env';
import { symbols } from '@/helpers/symbols';
import axios, { AxiosRequestConfig} from 'axios';
import { ExchangeRateNotFoundError } from './errors/exchange-rate-not-found';
import { CurrencyRepository } from '@/repositories/currency-repository';
import { ExchangeRate } from './dto/exchange-rate';
import { IssueWithTheRequestedExchangeRateError } from './errors/issue-with-the-requested-exchange-rate';
import { IssueWithRequestError } from './errors/issue-with-request';

const headers = {
    'apikey': env.API_KEY, // Adds an Authorization header with an access token
};

// Request configuration
const config: AxiosRequestConfig = {
    url: 'https://api.apilayer.com/exchangerates_data/',
    method: 'get',
    headers
};

export class ConvertCurrencyUserCase {

    constructor(private currencyRepository: CurrencyRepository) {}

    async execute(amount: number, base: string): Promise<ExchangeRate[]> {
        try {
            const checkCacheCurrency = await this.currencyRepository.get(amount, base);

            if (checkCacheCurrency) {
                return checkCacheCurrency;
            }

            config.url = config.url + `latest?symbols=${symbols}&base=${base}`;

            const response = await axios(config);

            if (!response.data.success) {
                throw new IssueWithRequestError();
            }

            const rates = response.data.rates;

            if (!rates) {
                throw new ExchangeRateNotFoundError();
            }

            const result: ExchangeRate[] = [];

            for(const currency in rates) {
                result.push({symbol: currency, price: Number((rates[currency] * amount).toFixed(2))});
            }

            await this.currencyRepository.create(amount, base, result);

            return result;
        }  catch (err){
            throw new IssueWithTheRequestedExchangeRateError();
        }
    }
}
