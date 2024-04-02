import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()


const connectDB=async()=>{
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI  must be defined');
      }
    
      try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connected to mongoDB');
      } catch (error) {
        console.error(error);
      }
}

export default connectDB
