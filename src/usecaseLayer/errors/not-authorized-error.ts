import { CustomError } from './custom-error';

export class NotAuthorizedErro extends CustomError {
    statusCode = 401;
    constructor() {
        super('Not authorized');

        Object.setPrototypeOf(this, NotAuthorizedErro.prototype);
    }

    serializeErrors() {
        return [{ message: 'Not authorized' }];
    }
}
