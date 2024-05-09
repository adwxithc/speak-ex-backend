import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';

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

        this.io.on('connection', this.handleConnection);
    }


    private handleConnection(socket: Socket){
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
        socket.on('setMessageSeen', ({receiverId}) => {
            
            
            const user = this.getUser(receiverId);
            this.io.to(user?.socketId || '').emit('getMessageSeen');
        });

        socket.on('disconnect', () => {
            console.log('a user disconnected');

            this.removeUser(socket.id);
            this.io.emit('getUsers', this.users);
        });

        

        // webRTC

        socket.on('session:start',({userId})=>{
            console.log('new video session iniated');
            this.addUser(userId,socket.id);
            const sessionId=this.getUniqueString();
            socket.join(sessionId);
            this.io.to(socket.id).emit('session:started',{sessionId});
        });

        socket.on('session:join',({userId, sessionId})=>{

            this.addUser(userId,socket.id);
            this.io.emit('session:join-allow',{sessionId});
            this.io.to(sessionId).emit('session:user-joined',{userId,socketId:socket.id});
            socket.join(sessionId);
            
    
        });

        socket?.on('session:call-user',({from,to, offer})=>{
            
            const {socketId}= this.getUser(to) || {};
            this.io.to(socketId || '').emit('incomming:call',{from,offer});

        });

        socket.on('call:accepted',({to,ans,from})=>{
            
            
            
            const {socketId}= this.getUser(to) || {};
            this.io.to(socketId || '').emit('call:accepted',{from,ans});
        });

        socket.on('peer:nego-needed',({from,to, offer})=>{
            console.log('peer:nego-needed',offer);
            
            const {socketId}= this.getUser(to) || {};
            this.io.to(socketId || '').emit('peer:nego-needed',{from,offer});
         
            
        });

        socket.on('peer:nego-done',({from,to, ans})=>{
            console.log('peer:nego-done',ans);
            
            const {socketId}= this.getUser(to) || {};
            this.io.to(socketId || '').emit('peer:nego-final',{from,ans});
            
            
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
        return this.users.find((user) => user.userId === userId);
    }

    getUniqueString = () => {
        const randomString = Math.random().toString(36);
        return Date.now().toString(36) + randomString.slice(2);
    };
    
}
