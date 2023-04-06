import { convertCurrencyUserCase } from '@/use-cases/convert-currency';
import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ExchangeRateNotFoundError } from '@/use-cases/errors/exchange-rate-not-found';

export async function convertCurrency(request: FastifyRequest, reply: FastifyReply) {

    const currencyBodySchema = z.object({
        price: z.number(),
    });

    const { price } = currencyBodySchema.parse(request.body);

    try {
        const result = await convertCurrencyUserCase(price);

        return reply.status(200).send(result);
    } catch (err) {
        if (err instanceof ExchangeRateNotFoundError) {
            return reply.status(409).send();
        }
        throw err;
    }

}