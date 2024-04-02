import express, { Request, Response } from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
// import {errorHandler,NotFoundError } from '@adjticketing/common'

// import { currentUserRouter } from './routes/current-user';



const app = express();
app.use(express.json());
// app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV!=='test',
  })
);

app.get('/',(req:Request,res:Response)=>{
    res.send({success:true})
})

// app.use(currentUserRouter);


// app.all('*', () => {
//   throw new NotFoundError();
// });

// app.use(errorHandler);

export { app }
