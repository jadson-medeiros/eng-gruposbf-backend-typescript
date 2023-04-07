import { expect, describe, it } from 'vitest';
import { ConvertCurrencyUserCase } from './convert-currency';
import { InMemoryCurrencyRepository } from '@/repositories/in-memory/in-memory-currency-repository';
import { IssueWithTheRequestedExchangeRateError } from './errors/issue-with-the-requested-exchange-rate';

describe('', () =>{
    it('should return a value.', async () =>{
        const currencyRepository = new InMemoryCurrencyRepository();
        const convertUserCase = new ConvertCurrencyUserCase(currencyRepository);

        const result = await convertUserCase.execute(105);

        expect(result.length > 0).toBe(true);
    });


    it('should return an error when I send an invalid price.', async () =>{
        const currencyRepository = new InMemoryCurrencyRepository();
        const convertUserCase = new ConvertCurrencyUserCase(currencyRepository);

        expect(() =>
            convertUserCase.execute(0.000002)
        ).rejects.toBeInstanceOf(IssueWithTheRequestedExchangeRateError);
    });
});
