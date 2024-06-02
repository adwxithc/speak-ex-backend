import { INotificationRepository } from '../../../interface/repository/INotification';
import { IFileBucket } from '../../../interface/services/IFileBucket';

export const getSingleNotification = async ({
    userId,
    notificationId,
    notificationRepository,
    fileBucket,
}: {
    userId: string;
    notificationId: string;
    notificationRepository: INotificationRepository;
    fileBucket: IFileBucket;
}) => {
    const notification = await notificationRepository.getSingleNotification({
        userId,
        notificationId,
    });

    notification.actionCreatorInfo.profile = fileBucket.getFileAccessURL(
        notification.actionCreatorInfo.profile
    );

    return notification;
};
