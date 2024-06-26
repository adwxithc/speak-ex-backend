import { Server, Socket } from 'socket.io';
import { ISocketRepository } from '../../usecaseLayer/interface/repository/ISocketRepository';
import { videoSessionUseCase } from '../../infrastructureLayer/webserver/routes/injections/videoSessionInjection';
// import { IVideoSessionUseCase } from '../../usecaseLayer/interface/usecase/videoSessionUseCase';

export class SocketController {
    private socketRepository: ISocketRepository;
    // private videoSessionUseCase: IVideoSessionUseCase;

    constructor({
        socketRepository,
    }: // videoSessionUseCase,
    {
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
            await this.socketRepository.removeUser(socket.id);
            const users = await this.socketRepository.getAllUsers();
            io.emit('getUsers', users);
        });

        // webRTC
        socket.on('session:start', async ({ userId, offer }) => {
            console.log('new video session iniated');

            const liveUsers =
                await this.socketRepository.getAllUserFromPriority();

            const { data: session } = await videoSessionUseCase.startSession({
                userId,
                liveUsers,
            });
            socket.join(session?.sessionCode || '');
            
            await this.socketRepository.setSession(
                session.sessionCode,

                JSON.stringify({
                    offer,
                    learnerReady: false,
                    helperReady: false,
                })
            );

            

            io.to(socket.id).emit('session:started', {
                sessionId: session?.sessionCode,
            });
            const selectedLearner = session?.offers[0];

            const user = await this.socketRepository.getUser(
                selectedLearner?.toString() || ''
            );

            if (user) {
                io.to(user.socketId).emit('session:available', {
                    sessionId: session?.sessionCode,
                    start: Date.now(),
                });
                
                await this.socketRepository.descreasePriority({
                    userId: user.userId,
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
            let session = null;
            if (allowed) {
                session = await this.socketRepository.getSession(sessionId);
                if (session) {
                    session = JSON.parse(session);
                }
            }

            io.to(socket.id).emit('session:join-allow', {
                sessionId,
                isMonetized: data?.isMonetized || false,
                allowed,
                message,
                remoteUserId: data?.helper.toString(),
                startTime: data?.createdAt,
                offer: session.offer,
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
            const { data: selectedLearner } = await videoSessionUseCase.rematch(
                {
                    sessionCode: sessionId,
                    liveUsers,
                }
            );

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

        socket?.on('peer:ice-candidate', async ({ candidate, to, from }) => {
            const { socketId } =
                (await this.socketRepository.getUser(to)) || {};
            io.to(socketId || '').emit('peer:ice-candidate', {
                candidate,
                from,
            });
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

        socket.on('session:client-ready', async ({ sessionCode, role, to }) => {
            const session = await this.socketRepository.getSession(sessionCode);
            if (session) {
                const data = JSON.parse(session);
                if (
                    (role == 'helper' && data['learner'] == true) ||
                    (role == 'learner' && data['helper'] == true)
                ) {
                    socket.emit('session:client-ready');
                }

                const setSessionPromise = this.socketRepository.setSession(
                    sessionCode,
                    JSON.stringify({ ...data, [role]: true })
                );

                const getUserPromise = this.socketRepository.getUser(to);

                const [user] = await Promise.all([
                    getUserPromise,
                    setSessionPromise,
                ]) ;
                io.to(user?.socketId || '').emit('session:client-ready');
            }
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
