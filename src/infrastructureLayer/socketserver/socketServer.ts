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


    private handleConnection(socket: Socket){
        console.log('a user connected');

        socket.on('addUser', ({ userId }) => {  
            console.log('user added',userId,'->',socket.id);
            
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

        socket.on('session:start',async ({userId})=>{
            console.log('new video session iniated');
            
            const {session,learners} = await videoSessionUseCase.startSession({userId});
            socket.join(session.sessionCode);
            this.io.to(socket.id).emit('session:started',{sessionId:session.sessionCode});
            
             
            learners.forEach(learner=>{
                const user =this.getUser(learner.id);
 
                if(user){
                    this.io.to(user.socketId).emit('session:available',{sessionId:session.sessionCode});
                }
            });
        });

        socket.on('session:join',async({userId, sessionId})=>{ 
            console.log('session join from learner');
            
            
            const session = await videoSessionUseCase.joinSession({userId, sessionId});
            const allowed=Boolean(session);
            this.io.to(socket.id).emit('session:join-allow',{sessionId, allowed});
        
            
            if(allowed){
                console.log('allowed to send user joined noti in the room');
                
                this.io.to(sessionId).emit('session:user-joined',{userId,socketId:socket.id});
             
            }
            socket.join(sessionId);
            
        });
 
       
      

        socket?.on('session:call-user',({from,to, offer})=>{
            console.log('call user ',offer);
            
            const {socketId}= this.getUser(to) || {};
            console.log('incomming:call-incomming:call-incomming:call-incomming:call',socketId);
            
            this.io.to(socketId || '').emit('incomming:call',{from,offer});

        });
 
        socket.on('call:accepted',({to,ans,from})=>{
         
            console.log('call accepted',ans);
            
            const {socketId}= this.getUser(to) || {};
          
            //call accepted is sending hear but not getting at client side

            
            this.io.to(socketId || '').emit('call:accepted',{from,ans});
          
        });

        socket.on('peer:nego-needed',({from,to, offer})=>{
            console.log('peer negosition need');
            
            const {socketId}= this.getUser(to) || {};
            this.io.to(socketId || '').emit('peer:nego-needed',{from,offer});
         
            
        });

        socket.on('peer:nego-done',({from,to, ans})=>{
           
            console.log('peer nego done');
            
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
        if(!userId) return null
        return this.users.find((user) => user.userId.toString() === userId.toString()) ;
    }

    getUniqueString = () => {
        const randomString = Math.random().toString(36);
        return Date.now().toString(36) + randomString.slice(2);
    };
    
}
