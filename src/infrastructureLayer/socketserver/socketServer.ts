import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { videoSessionUseCase } from '../webserver/routes/injections/videoSessionInjection';
import { redisDB } from '../webserver/config/redis';

const client = redisDB();

export class SocketManager {
    private httpServer: HttpServer;
    private io: Server;

    constructor(httpServer: HttpServer) {
        this.httpServer = httpServer;
        this.io = new Server(this.httpServer, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
            },
        });
        console.log('socket server initalized');

        this.io.on('connection', this.handleConnection.bind(this));
    }

    private handleConnection(socket: Socket) {
        // console.log('a user connected');

        socket.on('addUser', async ({ userId }) => {
            this.addUser(userId, socket.id);
            const users = await this.getAllUsers();
            this.io.emit('getUsers', users);
        });

        //send and get message
        socket.on('sendMessage', async ({ senderId, receiverId, text }) => {
            const user = await this.getUser(receiverId);

            this.io.to(user?.socketId || '').emit('getMessage', {
                senderId,
                text,
            });
        });
        socket.on('setMessageSeen', async ({ receiverId }) => {
            const user = await this.getUser(receiverId);
            this.io.to(user?.socketId || '').emit('getMessageSeen');
        });

        socket.on('disconnect', async () => {
            // console.log('a user disconnected');
            this.removeUser(socket.id);
            const users = await this.getAllUsers();
            this.io.emit('getUsers', users);
        });

        // webRTC

        socket.on('session:start', async ({ userId }) => {
            // console.log('new video session iniated');

            const liveUsers = await this.getAllUserFromPriority();
            const session = await videoSessionUseCase.startSession({
                userId,
                liveUsers,
            });

            socket.join(session.sessionCode);
            this.io
                .to(socket.id)
                .emit('session:started', { sessionId: session.sessionCode });
            const selectedLearner = session.offers[0];

            const user = await this.getUser(selectedLearner?.toString() || '');

            if (user) {
                this.descreasePriority({ userId: user.userId });
                this.io.to(user.socketId).emit('session:available', {
                    sessionId: session.sessionCode,
                    start: Date.now(),
                });
            }
        });

        socket.on('session:join', async ({ userId, sessionId }) => {
            const session = await videoSessionUseCase.joinSession({
                userId,
                sessionId,
            });
            const allowed = Boolean(session);
            this.io
                .to(socket.id)
                .emit('session:join-allow', { sessionId, allowed });

            if (allowed) {
                this.io.to(sessionId).emit('session:user-joined', {
                    userId,
                    socketId: socket.id,
                });
            }
            socket.join(sessionId);
        });

        socket.on('session:rematch', async ({ sessionId }) => {
            // console.log(' video session rematch iniated');

            const liveUsers = await this.getAllUserFromPriority();
            const selectedLearner = await videoSessionUseCase.rematch({
                sessionCode: sessionId,
                liveUsers,
            });

            const user = await this.getUser(selectedLearner?.toString() || '');

            if (user) {
                this.io
                    .to(user.socketId)
                    .emit('session:available', { sessionId });
                this.descreasePriority({ userId: user.userId });
            }
        });

        socket.on('session:terminate', async ({ sessionCode }) => {
            // console.log('session terminated--');

            await videoSessionUseCase.terminateSession({ sessionCode });
        });

        socket?.on('session:call-user', async ({ from, to, offer }) => {
            const { socketId } = (await this.getUser(to)) || {};
            this.io.to(socketId || '').emit('incomming:call', { from, offer });
        });

        socket.on('call:accepted', async ({ to, ans, from }) => {
            const { socketId } = (await this.getUser(to)) || {};
            this.io.to(socketId || '').emit('call:accepted', { from, ans });
        });

        socket.on('peer:nego-needed', async ({ from, to, offer }) => {
            const { socketId } = (await this.getUser(to)) || {};
            this.io
                .to(socketId || '')
                .emit('peer:nego-needed', { from, offer });
        });

        socket.on('peer:nego-done', async ({ from, to, ans }) => {
            const { socketId } = (await this.getUser(to)) || {};
            this.io.to(socketId || '').emit('peer:nego-final', { from, ans });
        });
    }

    async addUser(userId: string, socketId: string) {
        await client.hset('users', userId, socketId);
        await this.addToPriorityQueue({ userId });
    }

    async removeUser(socketId: string) {
        const users = await this.getAllUsers();
        const user = users.find((user) => user.socketId == socketId);
        if (user) {
            await client.hdel('users', user.userId);
            await this.removePriority({ userId: user.userId });
        }
    }

    async getUser(userId: string) {
        if (!userId) return null;
        const socketId = await client.hget('users', userId);
        return socketId ? { userId, socketId } : null;
    }

    async getAllUsers() {
        const keyValuePairs = await client.hgetall('users');
        const pairsArray = [];
        for (const userId in keyValuePairs) {
            pairsArray.push({ userId, socketId: keyValuePairs[userId] });
        }
        return pairsArray || [];
    }

    async addToPriorityQueue({ userId }: { userId: string }) {
        await client.zadd('priority', 0, userId);
    }
    async getAllUserFromPriority() {
        const users = await client.zrevrange('priority', 0, -1);
        return users;
    }
    async descreasePriority({ userId }: { userId: string }) {
        await client.zincrby('priority', -1, userId);
    }
    async removePriority({ userId }: { userId: string }) {
        await client.zrem('priority', userId);
    }
}