
import UserModel from '../../../models/userModel';


export const follow = async(
    {  
        followerId,
        followedUserId,
        userModel
    }:{
        followerId:string,
        followedUserId:string,
        userModel:typeof UserModel
    }
):Promise<void>=>{

    
    await userModel.bulkWrite([
        {
            updateOne: {
                filter: { _id: followerId },
                update: { $addToSet: { following: followedUserId } },
                
            }
        },
        {
            updateOne: {
                filter: { _id: followedUserId },
                update: { $addToSet: { followers: followerId } },
                
            }
        }
    ]);
       
};