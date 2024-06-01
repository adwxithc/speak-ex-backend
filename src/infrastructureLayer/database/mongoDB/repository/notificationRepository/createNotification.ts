import INotification from '../../../../../domain/notification';
import NotificationModel from '../../models/NotificationModel';

export const createNotification = async({
    newNotification,
    notificationModel
}:{
    newNotification:INotification
    notificationModel:typeof NotificationModel
})=>{

    const notification = await notificationModel.create(newNotification);
    return await notification.save();
    
};