import { expect, describe, it, beforeEach } from 'vitest';
import { ConvertCurrencyUserCase } from './convert-currency';
import { InMemoryCurrencyRepository } from '@/repositories/in-memory/in-memory-currency-repository';
import { IssueWithTheRequestedExchangeRateError } from './errors/issue-with-the-requested-exchange-rate';

let currencyRepository: InMemoryCurrencyRepository;
let convertUserCase: ConvertCurrencyUserCase;

describe('Convert Currency use case', () => {
    beforeEach(() => {
        currencyRepository = new InMemoryCurrencyRepository();
        convertUserCase = new ConvertCurrencyUserCase(currencyRepository);
    });
    it('should return a value.', async () =>{
        const result = await convertUserCase.execute(105, 'BRL');

        expect(result.length > 0).toBe(true);
    });


    it('should return an error when I send an invalid price.', async () =>{
        await expect(() =>
            convertUserCase.execute(0.000002, 'BRL')
        ).rejects.toBeInstanceOf(IssueWithTheRequestedExchangeRateError);
    });
});
