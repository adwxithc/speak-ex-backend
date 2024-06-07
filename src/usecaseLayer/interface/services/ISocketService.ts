export interface ISocketService {
    notifyUser({socketId,notificationId}:{socketId:string,notificationId:string}):void
}