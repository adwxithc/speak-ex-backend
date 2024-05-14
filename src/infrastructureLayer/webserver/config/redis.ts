import { Redis } from 'ioredis';
import dotenv from'dotenv';
dotenv.config();

export function redisDB(){
    const redisClient = () => {
        if (process.env.REDIS_URL){
            
            return process.env.REDIS_URL;
        }
        throw new Error ('Redis connection failed');
        
    };

    const redis = new Redis(redisClient());
    redis.on('error', (error) => {
        console.error('Redis connection error:', error);
    });
    return redis;
}