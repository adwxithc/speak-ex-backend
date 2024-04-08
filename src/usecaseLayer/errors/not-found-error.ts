import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
    constructor() {
        super('Route Not Found');

        //This is only because we are extending a built in class
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    statusCode = 404;

    serializeErrors() {
        return [{ message: 'not found' }];
    }
}
