import { Redis } from 'ioredis';
import { ISocketRepository } from '../../../../usecaseLayer/interface/repository/ISocketRepository';

export class SocketRepository implements ISocketRepository {
    constructor(private redisClient: Redis) {}

    async addUser(userId: string, socketId: string) {
        const setUserPromise= this.redisClient.hset('users', userId, socketId);
        const addPriorityPromise= this.addToPriorityQueue({ userId });
        await Promise.all([setUserPromise, addPriorityPromise]);
    }

    async removeUser(socketId: string) {
        const users = await this.getAllUsers();
        const user = users.find((user) => user.socketId == socketId);
        if (user) {
            const delPromise=  this.redisClient.hdel('users', user.userId);
            const removePriorityPromise= this.removePriority({ userId: user.userId });
            await Promise.all([delPromise,removePriorityPromise]);
        }
    }

    async getUser(userId: string) {
        if (!userId) return null;
        const socketId = await this.redisClient.hget('users', userId);
        return socketId ? { userId, socketId } : null;
    }

    async getAllUsers() {
        const keyValuePairs = await this.redisClient.hgetall('users');
        const pairsArray = [];
        for (const userId in keyValuePairs) {
            pairsArray.push({ userId, socketId: keyValuePairs[userId] });
        }
        return pairsArray || [];
    }

    async addToPriorityQueue({ userId }: { userId: string }) {
        await this.redisClient.zadd('priority', 0, userId);
    }
    async getAllUserFromPriority() {
        const users = await this.redisClient.zrevrange('priority', 0, -1);
        return users;
    }
    async descreasePriority({ userId }: { userId: string }) {
        await this.redisClient.zincrby('priority', -1, userId);
    }
    async removePriority({ userId }: { userId: string }) {
        await this.redisClient.zrem('priority', userId);
    }
    async setSession(sessionCode: string, data: string){
        await this.redisClient.set(sessionCode,data,'EX', 3600);//expires in 1h
    }
    async getSession(sessionCode:string){
        return await this.redisClient.get(sessionCode);
    }
}
