
import { INotificationRepository } from '../../../interface/repository/INotification';

export const setNotificationReaded = async ({
    userId,
    notificationIds,
    notificationRepository
}: {
    userId:string,
    notificationIds:string[],
    notificationRepository:INotificationRepository
}) => {

    await notificationRepository.markAsRead({notificationIds,userId});
    return;
};
