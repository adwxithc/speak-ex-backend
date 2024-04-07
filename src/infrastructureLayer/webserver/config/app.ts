import express, { Request, Response } from 'express';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import { userRoute } from '../routes/userRoute';
import { errorHandler } from '../../../usecaseLayer/middleware/error-handler';
import { NotFoundError } from '../../../usecaseLayer/errors';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
// app.set('trust proxy', true);
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
    res.send({ success: true });
});


app.use('/api/user', userRoute(express.Router()));

app.all('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
