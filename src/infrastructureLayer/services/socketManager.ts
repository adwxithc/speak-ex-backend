import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

export class SocketManager {
    private httpServer: HttpServer;
    private users: { userId: string; socketId: string }[];
    private io: Server;

    constructor(httpServer: HttpServer) {
        this.users = [];
        this.httpServer = httpServer;
        this.io = new Server(httpServer, {
            cors: {
                origin: 'http://localhost:3000',
                methods: ['GET', 'POST'],
            },
        });
        console.log('socket server initalized');

        this.io.on('connection', (socket) => {
            console.log('a user connected');

            socket.on('addUser', ({userId}) => {
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

            socket.on('disconnect', () => {
                console.log('a user disconnected');

                this.removeUser(socket.id);
                this.io.emit('getUsers', this.users);
            });
        });
    }

    addUser(userId: string, socketId: string) {
        const user = this.users.find(user => user.userId === userId);
        
        
        if(user){
            user.socketId=socketId;
        }else{
            this.users.push({ userId, socketId });
        }
        
        
    }

    removeUser(socketId: string) {
        this.users = this.users.filter((user) => user.socketId !== socketId);
    }

    getUser(userId:string){
        return this.users.find((user) => user.userId === userId) ;
    }
}
