import NotificationModel from '../../models/NotificationModel';

export const getNotifications = async ({
    limit,
    page,
    userId,
    notificationModel,
}: {
    limit: number;
    page: number;
    userId: string;
    notificationModel: typeof NotificationModel;
}) => {
    const notifications = await notificationModel
        .find({userId,read:false})
        .sort({ updatedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    const totalNotifications = await notificationModel.countDocuments({userId,read:false});

    return { notifications, totalNotifications };
};
