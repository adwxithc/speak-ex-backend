import {Socket, Server} from 'socket.io';


export class VideoSession {
    private users: { userId: string; socketId: string }[];
    constructor() {}

    async startVideoSession(socket:Socket,io:Server){
        console.log('new video session iniated');
        
        this.addUser(userId,socket.id);
        const sessionId=this.getUniqueString();
        socket.join(sessionId);
        this.io.to(socket.id).emit('session:started',{sessionId});
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