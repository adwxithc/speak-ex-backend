import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { socketController } from '../routes/injections/socketInjection';


class Socket {
    private io: Server | null = null;
    
    public init(server: HttpServer): void {
        
        this.io =new Server(server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
            },
        });
        console.log('socket initalized');
        this.io.on('connection', (socket)=>{
            socketController.handleConnection(socket,this.io as Server);
        });
    }

    public getIo(): Server {
        if (!this.io) {
            throw new Error('Socket.io not initialized');
        }
        return this.io;
    }
}

const socketInstance = new Socket();
export default socketInstance;
