export class IssueWithRequestError extends Error {
    constructor() {
        super('Issue with the request.');
    }
}