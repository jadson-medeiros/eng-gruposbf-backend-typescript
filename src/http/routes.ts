import { convertCurrency } from './controllers/convert-currency';
import { FastifyInstance } from 'fastify';

export async function appRoutes(app: FastifyInstance) {
    app.get('/api/convert/:base/:price', convertCurrency);
}