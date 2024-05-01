import express from 'express';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import { userRoute } from '../routes/userRoute';
import { adminRoute } from '../routes/adminRoute';
import { postRoute } from '../routes/postRoute';
import { errorHandler } from '../middlewares/error-handler';
import { NotFoundError } from '../../../usecaseLayer/errors';

import dotenv from 'dotenv';
import { Req } from '../../types/expressTypes';
import { chatRoute } from '../routes/chatRoute';


dotenv.config();

const app = express();
app.use(express.json());
// app.set('trust proxy', true);
app.use(cookieParser());




app.use('/api/user', userRoute(express.Router()));
app.use('/api/admin', adminRoute(express.Router()));
app.use('/api/post', postRoute(express.Router()));
app.use('/api/chat',chatRoute(express.Router()));

app.all('*', (req:Req) => {
    console.log(req.originalUrl,'original url');
    
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
