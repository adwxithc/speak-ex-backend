import mongoose from 'mongoose';
import NotificationModel from '../../models/NotificationModel';
import { INotificationDetails } from '../../../../../usecaseLayer/interface/usecase/userUseCase';

export const getSingleNotification = async ({
    userId,
    notificationId,
    notificationModel,
}: {
    
    notificationId:string;
    userId: string;
    notificationModel: typeof NotificationModel;
}) => {

    const [notification]= await notificationModel.aggregate([
        {
            $match:{
                userId,
                _id:new mongoose.Types.ObjectId(notificationId)
            }
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
 

  

    return notification as INotificationDetails;
};
