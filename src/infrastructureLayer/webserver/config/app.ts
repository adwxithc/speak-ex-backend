import express from 'express';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import { userRoute } from '../routes/userRoute';
import { adminRoute } from '../routes/adminRoute';
import { errorHandler } from '../../../usecaseLayer/middleware/error-handler';
import { NotFoundError } from '../../../usecaseLayer/errors';

import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
// app.set('trust proxy', true);
app.use(cookieParser());




app.use('/api/user', userRoute(express.Router()));
app.use('/api/admin', adminRoute(express.Router()));

app.all('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
