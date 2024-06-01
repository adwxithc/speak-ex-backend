import { INotificationRepository } from '../../../interface/repository/INotification';
import { IFileBucket } from '../../../interface/services/IFileBucket';

export const getNotifications = async ({
    userId,
    page,
    limit,
    notificationRepository,
    fileBucket
}: {
    userId: string;
    page: number;
    limit: number;
    notificationRepository: INotificationRepository;
    fileBucket:IFileBucket
    
}) => {
    

    const {notifications,totalNotifications} = await notificationRepository.getNotifications({limit,page,userId});
    notifications.forEach(n=>{
        n.actionCreatorInfo.profile=fileBucket.getFileAccessURL(n.actionCreatorInfo.profile);
    });
    const lastPage = Math.ceil(totalNotifications / limit);

    return {notifications,totalNotifications,lastPage,currentPage:page};
};
