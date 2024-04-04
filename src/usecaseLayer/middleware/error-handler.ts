
import { Next, Req, Res } from '../../infrastructureLayer/types/expressTypes';
import { CustomError } from '../errors/custom-error';
export const errorHandler = (
  err: Error,
  req: Req,
  res: Res,
  next: Next
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.error(err)

  res.status(500).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
