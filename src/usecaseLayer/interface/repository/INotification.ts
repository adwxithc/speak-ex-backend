import INotification from '../../../domain/notification';
import { INotificationDetails } from '../usecase/userUseCase';

export interface INotificationRepository {
    createNotification(newNotification:INotification): Promise<INotification>
    markAsRead({notificationIds,userId}:{notificationIds:string[],userId:string}):Promise<boolean>
    getNotifications({limit,page,userId}:{limit:number,page:number,userId:string}):Promise<{notifications:INotificationDetails[],totalNotifications:number,totalUnReadedNotifications:number}>
    getSingleNotification({userId, notificationId}:{userId:string, notificationId:string}):Promise<INotificationDetails>
}