import INotification from '../../../domain/notification';

export interface INotificationRepository {
    createNotification(newNotification:INotification): Promise<INotification>
    markAsRead({notificationIds,userId}:{notificationIds:string[],userId:string}):Promise<boolean>
    getNotifications({limit,page,userId}:{limit:number,page:number,userId:string}):Promise<{notifications:INotification[],totalNotifications:number}>
}