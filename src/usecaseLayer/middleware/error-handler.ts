import { Next, Req, Res } from '../../infrastructureLayer/types/expressTypes';
import { CustomError } from '../errors/custom-error';
export const errorHandler = (err: Error, req: Req, res: Res,next:Next) => {
    console.error(err);
    if (err instanceof CustomError) {
        return res
            .status(err.statusCode)
            .send({ errors: err.serializeErrors() });
    }

    

    res.status(500).send({
        errors: [{ message: 'Something went wrong' }],
    });
};
