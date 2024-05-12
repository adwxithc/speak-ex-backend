
import UserModel from '../../../models/userModel';



export const getFollowers = async(
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
            $match: {userName }
        },
        {
            $project: {
                followers: {
                    $slice: ['$followers', (page - 1) * limit, limit]
                }
            }
        },
        {
            $unwind: '$followers'
        },
        {
            $lookup: {
                from: 'users', 
                localField: 'followers',
                foreignField: '_id',
                as: 'followerDetails'
            }
        },
        {
            $unwind: '$followerDetails'
        },
        {
            $project: {
                _id: 0,
                id: '$followerDetails._id',
                userName: '$followerDetails.userName',
                profile: '$followerDetails.profile',
                firstName:'$followerDetails.firstName',
                lastName:'$followerDetails.lastName',
                focusLanguage:'$followerDetails.focusLanguage',
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

    
    const totalFollowers = await userModel.findOne({ userName }, { followers: 1 });

    const totalUsers = totalFollowers?.followers ? totalFollowers.followers.length : 0;

    const results = await userModel.aggregate(pipeline) as {userName:string,profile:string,firstName:string, lastName:string,focusLanguage:string}[];
    console.log(results,'results-resultsresults-results-results-results');
    
    return {totalUsers,users:results};
};