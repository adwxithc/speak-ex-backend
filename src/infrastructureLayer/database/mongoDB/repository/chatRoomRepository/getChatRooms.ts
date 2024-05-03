import mongoose from 'mongoose';
import ChatRoomModel from '../../models/ChatRoom';
import { IChatList } from '../../../../../usecaseLayer/interface/repository/IChatRoomRepository';



export const getChatRooms = async({
    userId,
    key,
    chatRoomModel
}:{
    userId:string,
    key:string,
    chatRoomModel:typeof ChatRoomModel
}):Promise<IChatList>=>{
   
   
 
    


    const chatRooms = await chatRoomModel.aggregate([
        {
            $match: {
                members: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $addFields: {
                otherUserId: {
                    $arrayElemAt: [ // Get the other user ID from the members array
                        { $setDifference: ['$members', [new mongoose.Types.ObjectId(userId)]] },
                        0
                    ]
                },
                id:'$_id'
            }
        },
        {
            $lookup: {
                from: 'users', // Assuming your user collection is named 'User'
                localField: 'otherUserId',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind:'$user'
        },
        {
            $match:{'user.userName': { $regex: new RegExp(`^${key}`, 'i') }}
        },
        {
            $project: {
                _id: 0,
                id:1,
                members: 1,
                createdAt: 1,
                updatedAt: 1,
                otherUserId: 1,
                'user.userName': 1,
                'user.profile': 1
            }
        }
    ]) as IChatList;
    
    return chatRooms;

};