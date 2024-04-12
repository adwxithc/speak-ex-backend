import { CustomError } from './custom-error';

export class ForbiddenRequestError extends CustomError {
    statusCode = 403;
    constructor() {
        super('forbidden request');

        Object.setPrototypeOf(this, ForbiddenRequestError.prototype);
    }

    serializeErrors() {
        return [{ message: 'forbidden request' }];
    }
}
