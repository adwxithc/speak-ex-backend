import { Server, Socket } from 'socket.io';
import { ISocketRepository } from '../../usecaseLayer/interface/repository/ISocketRepository';
import { videoSessionUseCase } from '../../infrastructureLayer/webserver/routes/injections/videoSessionInjection';
// import { IVideoSessionUseCase } from '../../usecaseLayer/interface/usecase/videoSessionUseCase';

export class SocketController {
    private socketRepository: ISocketRepository;
    // private videoSessionUseCase: IVideoSessionUseCase;

    constructor({
        socketRepository,
        // videoSessionUseCase,
    }: {
        socketRepository: ISocketRepository;
        // videoSessionUseCase: IVideoSessionUseCase;
    }) {
        // console.log('in constructor ',videoSessionUseCase);
        
        this.socketRepository = socketRepository;
        // this.videoSessionUseCase = videoSessionUseCase;
    }

    async handleConnection(socket: Socket, io: Server) {
        console.log('a user connected');
        

        socket.on('addUser', async ({ userId }) => {
            this.socketRepository.addUser(userId, socket.id);
            const users = await this.socketRepository.getAllUsers();
            io.emit('getUsers', users);
        });

        //send and get message
        socket.on('sendMessage', async ({ senderId, receiverId, text }) => {
            const user = await this.socketRepository.getUser(receiverId);

            io.to(user?.socketId || '').emit('getMessage', {
                senderId,
                text,
            });
        });
        socket.on('setMessageSeen', async ({ receiverId }) => {
            const user = await this.socketRepository.getUser(receiverId);
            io.to(user?.socketId || '').emit('getMessageSeen');
        });

        socket.on('disconnect', async () => {
            this.socketRepository.removeUser(socket.id);
            const users = await this.socketRepository.getAllUsers();
            io.emit('getUsers', users);
        });

        // webRTC
        socket.on('session:start', async ({ userId }) => {
            console.log('new video session iniated');

            const liveUsers =
                await this.socketRepository.getAllUserFromPriority();

            const { data: session } =
                await videoSessionUseCase.startSession({
                    userId,
                    liveUsers,
                });

            socket.join(session?.sessionCode || '');

            io.to(socket.id).emit('session:started', {
                sessionId: session?.sessionCode,
            });
            const selectedLearner = session?.offers[0];

            const user = await this.socketRepository.getUser(
                selectedLearner?.toString() || ''
            );

            if (user) {
                await this.socketRepository.descreasePriority({
                    userId: user.userId,
                });

                io.to(user.socketId).emit('session:available', {
                    sessionId: session?.sessionCode,
                    start: Date.now(),
                });
            }
        });

        socket.on('session:join', async ({ userId, sessionId }) => {
            const {
                success: allowed,
                message,
                data,
            } = await videoSessionUseCase.joinSession({
                userId,
                sessionId,
            });

            io.to(socket.id).emit('session:join-allow', {
                sessionId,
                isMonetized: data?.isMonetized || false,
                allowed,
                message,
                startTime: data?.createdAt,
            });

            if (allowed) {
                io.to(sessionId).emit('session:user-joined', {
                    userId,
                    socketId: socket.id,
                    startTime: data?.createdAt,
                });
            }
            socket.join(sessionId);
        });

        socket.on('session:rematch', async ({ sessionId }) => {
            const liveUsers =
                await this.socketRepository.getAllUserFromPriority();
            const { data: selectedLearner } =
                await videoSessionUseCase.rematch({
                    sessionCode: sessionId,
                    liveUsers,
                });

            const user = await this.socketRepository.getUser(
                selectedLearner?.toString() || ''
            );

            if (user) {
                io.to(user.socketId).emit('session:available', { sessionId });
                this.socketRepository.descreasePriority({
                    userId: user.userId,
                });
            }
        });

        socket.on('session:terminate', async ({ sessionCode, endingTime }) => {
            const res = await videoSessionUseCase.terminateSession({
                sessionCode,
                endingTime,
            });

            if (res.success) {
                io.to(sessionCode).emit('session:terminate', {
                    coinExchange: res.data,
                });
            }
        });

        socket?.on('session:call-user', async ({ from, to, offer }) => {
            const { socketId } =
                (await this.socketRepository.getUser(to)) || {};
            io.to(socketId || '').emit('incomming:call', { from, offer });
        });

        socket.on('call:accepted', async ({ to, ans, from }) => {
            const { socketId } =
                (await this.socketRepository.getUser(to)) || {};
            io.to(socketId || '').emit('call:accepted', { from, ans });
        });

        socket.on('peer:nego-needed', async ({ from, to, offer }) => {
            const { socketId } =
                (await this.socketRepository.getUser(to)) || {};
            io.to(socketId || '').emit('peer:nego-needed', { from, offer });
        });

        socket.on('peer:nego-done', async ({ from, to, ans }) => {
            const { socketId } =
                (await this.socketRepository.getUser(to)) || {};
            io.to(socketId || '').emit('peer:nego-final', { from, ans });
        });
    }
}
