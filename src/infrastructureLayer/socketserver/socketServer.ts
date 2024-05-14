import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { videoSessionUseCase } from './socketInjection/videoSessionInjection';

export class SocketManager {
    private httpServer: HttpServer;
    private users: { userId: string; socketId: string }[];
    private io: Server;

    constructor(httpServer: HttpServer) {
        this.users = [];
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
        console.log('a user connected');

        socket.on('addUser', ({ userId }) => {
            this.addUser(userId, socket.id);
            this.io.emit('getUsers', this.users);
        });

        //send and get message
        socket.on('sendMessage', ({ senderId, receiverId, text }) => {
            const user = this.getUser(receiverId);

            this.io.to(user?.socketId || '').emit('getMessage', {
                senderId,
                text,
            });
        });
        socket.on('setMessageSeen', ({ receiverId }) => {
            const user = this.getUser(receiverId);
            this.io.to(user?.socketId || '').emit('getMessageSeen');
        });

        socket.on('disconnect', () => {
            console.log('a user disconnected');

            this.removeUser(socket.id);
            this.io.emit('getUsers', this.users);
        });

        // webRTC

        socket.on('session:start', async ({ userId }) => {
            console.log('new video session iniated');

            const liveUsers = this.users.map((item) => item.userId);
            const session = await videoSessionUseCase.startSession({
                userId,
                liveUsers,
            });

            socket.join(session.sessionCode);
            this.io
                .to(socket.id)
                .emit('session:started', { sessionId: session.sessionCode });
            const selectedLearner = session.offers[0];

            const user = this.getUser(selectedLearner?.toString() || '');

            if (user) {
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
            console.log(' video session rematch iniated');

            const liveUsers = this.users.map((item) => item.userId);
            const selectedLearner = await videoSessionUseCase.rematch({
                sessionCode: sessionId,
                liveUsers,
            });

            if (!selectedLearner) {
                this.io
                    .to(socket.id)
                    .emit('session:rematch', { selectedLearner });
                return;
            }

            const user = this.getUser(selectedLearner?.toString() || '');

            if (user) {
                this.io
                    .to(user.socketId)
                    .emit('session:available', { sessionId });
            }
        });

        socket?.on('session:call-user', ({ from, to, offer }) => {
            const { socketId } = this.getUser(to) || {};
            this.io.to(socketId || '').emit('incomming:call', { from, offer });
        });

        socket.on('call:accepted', ({ to, ans, from }) => {
            const { socketId } = this.getUser(to) || {};
            this.io.to(socketId || '').emit('call:accepted', { from, ans });
        });

        socket.on('peer:nego-needed', ({ from, to, offer }) => {
            const { socketId } = this.getUser(to) || {};
            this.io
                .to(socketId || '')
                .emit('peer:nego-needed', { from, offer });
        });

        socket.on('peer:nego-done', ({ from, to, ans }) => {
            const { socketId } = this.getUser(to) || {};
            this.io.to(socketId || '').emit('peer:nego-final', { from, ans });
        });
    }

    addUser(userId: string, socketId: string) {
        const user = this.users.find((user) => user.userId === userId);
        if (user) {
            user.socketId = socketId;
        } else {
            this.users.push({ userId, socketId });
        }
    }

    removeUser(socketId: string) {
        this.users = this.users.filter((user) => user.socketId !== socketId);
    }

    getUser(userId: string) {
        if (!userId) return null;
        return this.users.find(
            (user) => user.userId.toString() === userId.toString()
        );
    }

    getUniqueString = () => {
        const randomString = Math.random().toString(36);
        return Date.now().toString(36) + randomString.slice(2);
    };
}
