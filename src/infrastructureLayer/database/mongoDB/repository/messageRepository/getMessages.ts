
import mongoose from 'mongoose';
import IMessage from '../../../../../domain/message';
import MessageModel from '../../models/MessageModel';



export const getMessages = async({
    roomId,
    page,
    limit,
    messageModel
}:{
    roomId:string,
    page:number,
    limit:number
    messageModel:typeof MessageModel
}):Promise<{messages:IMessage[],totalMessages:number}>=>{
    

    const messages= await messageModel.aggregate([
        {
            $match: {
                roomId: new mongoose.Types.ObjectId(roomId),
               
            },
        },
        {
            $sort: { createdAt: -1 },
        },
        { $skip: (page - 1) * limit },
        { $limit: limit },
        {
            $sort:{createdAt:1}
        },
        {
            $project:{
                id:'$_id',
                _id:0,
                roomId:1,
                senderId:1,
                text:1,
                createdAt:1,
                updatedAt:1,
                seen:1
            }
        }
    ]) as IMessage[];

    const totalMessages = await messageModel.countDocuments({
        roomId,

    }) ;
    
    return {messages,totalMessages};
};
