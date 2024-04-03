import dotenv from 'dotenv';
dotenv.config();

import { app } from '../src/infrastructureLayer/webserver/config/app';
import connectDB from './infrastructureLayer/webserver/config/db';

const PORT = process.env.PORT || 3000;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  try {
    await connectDB();
  } catch (error) {
    console.error(error);
  }

  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}.!`);
  });
};

start();
