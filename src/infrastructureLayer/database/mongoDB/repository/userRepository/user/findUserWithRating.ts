import UserModel from '../../../models/userModel';


export const findUserWithRating = async(
    userName:string,
    userModel:typeof UserModel
)=>{
 
    const [existingUser] = await userModel.aggregate([
        {
            $match: { userName: userName }
        },
        {
            $lookup: {
                from: 'sessions', // The name of the sessions collection in MongoDB
                localField: '_id',
                foreignField: 'helper',
                as: 'sessions'
            }
        },
        {
            $addFields: {
                averageRating: { $avg: '$sessions.rating' }
            }
        },
        {
            $project: {
                _id: 0,
                id:'$_id',
                firstName: 1,
                lastName: 1,
                userName: 1,
                email: 1,
                profile: 1,
                blocked: 1,
                focusLanguage: 1,
                proficientLanguage: 1,
                followers: 1,
                following: 1,
                isMonetized: 1,
                requestedForMonetization: 1,
                coverPic:1,
                rating: { $ifNull: ['$averageRating', 0] }
            }
        }
    ]);
    
    return existingUser;
};