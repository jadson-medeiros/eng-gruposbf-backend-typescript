import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Convert Currency (e2e)', () => {

    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async() => {
        await app.close();
    });

    it('should be able to return a list of currencies', async () => {
        const response = await request(app.server).get('/api/convert/BRL/200');

        expect(response.statusCode).toBe(200);
    });
});