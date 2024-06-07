import { Redis } from 'ioredis';
import { ISocketRepository } from '../../../../usecaseLayer/interface/repository/ISocketRepository';

export class SocketRepository implements ISocketRepository {
    constructor(private redisClient: Redis) {}

    async addUser(userId: string, socketId: string) {
        await this.redisClient.hset('users', userId, socketId);
        await this.addToPriorityQueue({ userId });
    }

    async removeUser(socketId: string) {
        const users = await this.getAllUsers();
        const user = users.find((user) => user.socketId == socketId);
        if (user) {
            await this.redisClient.hdel('users', user.userId);
            await this.removePriority({ userId: user.userId });
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
}
