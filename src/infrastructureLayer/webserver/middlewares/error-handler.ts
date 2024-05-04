import { Next, Req, Res } from '../../types/expressTypes';
import { CustomError } from '../../../usecaseLayer/errors/custom-error';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Error, req: Req, res: Res,next :Next) => {
    console.error(err);
    if (err instanceof CustomError) {
        return res
            .status(err.statusCode)
            .send({ errors: err.serializeErrors() });
    }


    if (err.name === 'CastError' ) {
        return res.status(400).send({
            errors: [{ message: 'Invalid id format' }],
        });
    }

    res.status(500).send({
        errors: [{ message: 'Something went wrong' }],
    });
};
