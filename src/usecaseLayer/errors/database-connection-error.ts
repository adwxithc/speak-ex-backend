import { CustomError } from './custom-error';

export class DatabaseConnectionErrot extends CustomError {
    reason = 'Error connecting to database';
    statusCode = 500;

    constructor() {
        super('Error connecting to database');

        //This is only because we are extending a built in class
        Object.setPrototypeOf(this, DatabaseConnectionErrot.prototype);
    }

    serializeErrors() {
        return [{ message: this.reason }];
    }
}
