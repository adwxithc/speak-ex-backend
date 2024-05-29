import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
import { userRoute } from '../routes/userRoute';
import { adminRoute } from '../routes/adminRoute';
import { postRoute } from '../routes/postRoute';
import { errorHandler } from '../middlewares/error-handler';
import { NotFoundError } from '../../../usecaseLayer/errors';

import dotenv from 'dotenv';
import { Next, Req, Res } from '../../types/expressTypes';
import { chatRoute } from '../routes/chatRoute';
import { SocketManager } from '../../socketserver/socketServer';
import { videoSessionRote } from '../routes/videoSessionRote';

dotenv.config();

const app = express();
// app.use(express.json());


app.use((req: Req, res: Res, next: Next): void => {
    if (req.originalUrl === '/api/session/webhook') {
        next();
    } else {
        express.json()(req, res, next);
    }
});

app.set('trust proxy', true);
app.use(cookieParser());

app.use(cors());

const httpServer = http.createServer(app);

new SocketManager(httpServer);

app.use('/api/user', userRoute(express.Router()));
app.use('/api/admin', adminRoute(express.Router()));
app.use('/api/post', postRoute(express.Router()));
app.use('/api/chat', chatRoute(express.Router()));
app.use('/api/session', videoSessionRote(express.Router()));

app.all('*', (req: Req) => {
    console.log(req.originalUrl, 'original url');

    throw new NotFoundError();
});

app.use(errorHandler);

export { app, httpServer };
