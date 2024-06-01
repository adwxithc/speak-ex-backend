import NotificationModel from '../../models/NotificationModel';

export const markAsRead = async({
    notificationIds,
    userId,
    notificationModel
}:{
    notificationIds:string[],
    userId:string,
    notificationModel:typeof NotificationModel
})=>{
    const updated = await notificationModel.updateMany({_id:{$in:notificationIds},userId},{$set:{read:true}});
    return updated.modifiedCount==notificationIds.length;
};