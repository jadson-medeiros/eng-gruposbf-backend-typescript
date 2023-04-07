import { ConvertCurrencyUserCase } from '@/use-cases/convert-currency';
import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ExchangeRateNotFoundError } from '@/use-cases/errors/exchange-rate-not-found';
import { RedisCurrencyRepository } from '@/repositories/redis/redis-currency-repository';

export async function convertCurrency(request: FastifyRequest, reply: FastifyReply) {

    const currencyBodySchema = z.object({
        price: z.string(),
        base: z.string(),
    });

    try {
        const { price, base } = currencyBodySchema.parse(request.params);
        const convertRepository = new RedisCurrencyRepository();
        const convertCurrencyUserCase = new ConvertCurrencyUserCase(convertRepository);
        const result = await convertCurrencyUserCase.execute(Number.parseFloat(price), base);

        return reply.status(200).send(result);
    } catch (err) {
        if (err instanceof ExchangeRateNotFoundError) {
            return reply.status(409).send();
        }
        throw err;
    }
}