import { INotificationDetails } from '../../../../../usecaseLayer/interface/usecase/userUseCase';
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

    const notificationsPromise= notificationModel.aggregate([
        {
            $match:{
                userId
            }
        },
        {
            $sort:{createdAt: -1 }
        },
        {
            $skip:(page - 1) * limit
        },
        {
            $limit: limit
        },
        {
            $addFields: {
                actionCreatorLocalField: { $toObjectId: '$actionCreator' }
            }
        },
        {
            $lookup:{
                from:'users',
                localField:'actionCreatorLocalField',
                foreignField:'_id',
                as:'actionCreatorInfo'
            }
        },
        {
            $unwind: '$actionCreatorInfo'
        },
        {
            $project:{
                id:'$_id',
                _id:0,
                userId:1,
                title:1,
                message:1,
                read:1,
                type:1,
                relatedEntity:1,
                actionCreator:1,
                actionCreatorInfo:{
                    id:'$actionCreatorInfo._id',
                    firstName:'$actionCreatorInfo.firstName',
                    lastName:'$actionCreatorInfo.lastName',
                    userName:'$actionCreatorInfo.userName',
                    profile:'$actionCreatorInfo.profile'
                }
            }
        }
    ]);
   

    const totalNotificationsPromise = await notificationModel.countDocuments({userId});
    const totalUnReadedNotificationsPromise = await notificationModel.countDocuments({userId,read:false});

    const [notifications, totalNotifications, totalUnReadedNotifications]= await Promise.all([notificationsPromise,totalNotificationsPromise,totalUnReadedNotificationsPromise]) as [INotificationDetails[],number,number];

    return { notifications, totalNotifications, totalUnReadedNotifications };
};
