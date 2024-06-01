import INotification from '../../../../../domain/notification';
import { socketService } from '../../../../webserver/config/app';
import NotificationModel from '../../models/NotificationModel';

export const createNotification = async({
    newNotification,
    notificationModel
}:{
    newNotification:INotification
    notificationModel:typeof NotificationModel
})=>{


    const notification = await notificationModel.create(newNotification);
    socketService.notifyUser({userId:newNotification.userId,notificationId:notification.id});
    return await notification.save();
    
};