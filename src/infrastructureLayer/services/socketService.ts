import {  ISocketService } from '../../usecaseLayer/interface/services/ISocketService';
import socketInstance from '../webserver/config/socket';

export class SocketService implements ISocketService {
   
   

    notifyUser({
        socketId,
        notificationId,
    }: {
        socketId: string;
        notificationId: string;
    }) {
        const io= socketInstance.getIo();
        io.to(socketId).emit('notification', { notificationId });
    }
   
}
