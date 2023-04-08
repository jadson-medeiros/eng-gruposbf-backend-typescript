import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ExchangeRateNotFoundError } from '@/use-cases/errors/exchange-rate-not-found';
import { makeConvertCurrencyUseCase } from '@/use-cases/factories/make-convert-currency-use-case';

export async function convertCurrency(request: FastifyRequest, reply: FastifyReply) {

    const currencyBodySchema = z.object({
        price: z.string(),
        base: z.string(),
    });

    try {
        const { price, base } = currencyBodySchema.parse(request.params);

        const convertCurrencyUserCase = makeConvertCurrencyUseCase();

        const result = await convertCurrencyUserCase.execute(Number.parseFloat(price), base);

        return reply.status(200).send(result);
    } catch (err) {
        if (err instanceof ExchangeRateNotFoundError) {
            return reply.status(409).send();
        }
        throw err;
    }
}