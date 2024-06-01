import { INotificationRepository } from '../../../interface/repository/INotification';

export const getNotifications = async ({
    userId,
    page,
    limit,
    notificationRepository,
}: {
    userId: string;
    page: number;
    limit: number;
    notificationRepository: INotificationRepository;
    
}) => {
    

    const {notifications,totalNotifications} = await notificationRepository.getNotifications({limit,page,userId});
    
    const lastPage = Math.ceil(totalNotifications / limit);

    return {notifications,totalNotifications,lastPage};
};
