
import UserModel from '../../../models/userModel';


export const unfollow = async(
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
                update: { $pull: { following: followedUserId } },
                
            }
        },
        {
            updateOne: {
                filter: { _id: followedUserId },
                update: { $pull: { followers: followerId } },
                
            }
        }
    ]);
       
};