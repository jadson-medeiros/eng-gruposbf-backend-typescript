export class ExchangeRateNotFoundError extends Error {
    constructor() {
        super('Exchange rate not found.');
    }
}