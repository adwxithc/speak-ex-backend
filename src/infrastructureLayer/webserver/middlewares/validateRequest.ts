
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../../../usecaseLayer/errors/';
import { Next, Req, Res } from '../../types/expressTypes';

export const validateRequest = (
    req: Req,
    res: Res,
    next: Next
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    next();
};
