import express, { Request, Response } from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { userRoute } from '../routes/userRoute';
import { errorHandler } from '../../../usecaseLayer/middleware/error-handler';
import { NotFoundError } from '../../../usecaseLayer/errors';

const app = express();
app.use(express.json());
// app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.get('/', (req: Request, res: Response) => {
  res.send({ success: true });
});

app.use('/api/user', userRoute(express.Router()));

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
