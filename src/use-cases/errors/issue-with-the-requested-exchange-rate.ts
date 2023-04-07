export class IssueWithTheRequestedExchangeRateError extends Error {
    constructor() {
        super('Issue with the requested exchange rate.');
    }
}