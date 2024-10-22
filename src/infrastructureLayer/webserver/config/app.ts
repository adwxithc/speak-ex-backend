import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';

import { userRoute } from '../routes/userRoute';
import { adminRoute } from '../routes/adminRoute';
import { postRoute } from '../routes/postRoute';
import { errorHandler } from '../middlewares/error-handler';
import { NotFoundError } from '../../../usecaseLayer/errors';
import dotenv from 'dotenv';
import { Next, Req, Res } from '../../types/expressTypes';
import { chatRoute } from '../routes/chatRoute';
import { videoSessionRote } from '../routes/videoSessionRote';
import socketInstance from './socket';
import { swaggerSpec } from './swagger';

dotenv.config();

const app = express();

app.use(cookieParser());

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true, 
    optionsSuccessStatus: 200
};

// app.use(express.urlencoded({ extended: true }));

app.use((req: Req, res: Res, next: Next): void => {
    if (req.originalUrl === '/api/session/webhook') {
        
        next();
    } else {
        express.json()(req, res, next);
    }
});


app.set('trust proxy', true);


app.use(cors(corsOptions));

const httpServer = http.createServer(app);

socketInstance.init(httpServer);

app.use('/api/user', userRoute(express.Router()));
app.use('/api/admin', adminRoute(express.Router()));
app.use('/api/post', postRoute(express.Router()));
app.use('/api/chat', chatRoute(express.Router()));
app.use('/api/session', videoSessionRote(express.Router()));

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.all('*', (req:Req) => {
    console.log('----------------------------',req.originalUrl,req.method);
    
    throw new NotFoundError();
});

app.use(errorHandler);

export { app, httpServer };
