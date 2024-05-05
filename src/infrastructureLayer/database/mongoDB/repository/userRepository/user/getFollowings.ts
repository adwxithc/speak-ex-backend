
import UserModel from '../../../models/userModel';


export const getFollowings= async(
    {  
        userName,
        page,
        limit,
        userModel
    }:{
        userName:string,
        page:number,
        limit:number,
        userModel:typeof UserModel
    }
)=>{

    
    const pipeline = [
        {
            $match: { userName }
        },
        {
            $project: {
                following: {
                    $slice: ['$following', (page - 1) * limit, limit]
                }
            }
        },
        {
            $unwind: '$following'
        },
        {
            $lookup: {
                from: 'users', 
                localField: 'following',
                foreignField: '_id',
                as: 'followingDetails'
            }
        },
        {
            $unwind: '$followingDetails'
        },
        {
            $project: {
                _id: 0,
                id: '$followingDetails._id',
                userName: '$followingDetails.userName',
                profile: '$followingDetails.profile',
                firstName:'$followingDetails.firstName',
                lastName:'$followingDetails.lastName',
                followers:'$followingDetails.followers',
                focusLanguage:'$followingDetails.focusLanguage',
            }
        },
        {
            $addFields: {
                focusLanguageObjectId: { $toObjectId: '$focusLanguage' }
            }
        },
        {
            $lookup: {
                from: 'languages',
                localField: 'focusLanguageObjectId',
                foreignField: '_id',
                as: 'focusLanguageDetails'
            }
        },
        {
            $addFields: {
                usersFocusLanguage: { $arrayElemAt: ['$focusLanguageDetails', 0] }
            }
        },
        {
            $project: {
                
                'focusLanguage':0,
                'focusLanguageObjectId':0,
                'focusLanguageDetails':0
            }
        },
    ];
   
    

    const totalFollowings = await userModel.findOne({ userName}, { following: 1 });
  
    
    const totalUsers = totalFollowings?.following ? totalFollowings.following.length : 0;

    const results = await userModel.aggregate(pipeline) as {userName:string,profile:string,firstName:string, lastName:string,focusLanguage:string}[];
   
    return {totalUsers,users:results};
};