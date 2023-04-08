import { RedisCurrencyRepository } from '@/repositories/redis/redis-currency-repository';
import { ConvertCurrencyUserCase } from '../convert-currency';

export function makeConvertCurrencyUseCase() {

    const convertRepository = new RedisCurrencyRepository();
    const convertUserCase = new ConvertCurrencyUserCase(convertRepository);

    return convertUserCase;
}