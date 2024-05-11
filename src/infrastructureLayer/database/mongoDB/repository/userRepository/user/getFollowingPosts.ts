import mongoose from 'mongoose';
import UserModel from '../../../models/userModel';
import IUser from '../../../../../../domain/user';
import IPost from '../../../../../../domain/post';

export const getFollowingPosts = async({
    page,
    limit,
    userId,
    userModel
}:{
    page:number;
    limit:number;
    userId:string;
    userModel:typeof UserModel
})=>{
    const [result] = await userModel.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(userId),
            },
        },
        {
            $project: {
                following: 1,
            },
        },
        {
            $unwind: '$following',
        },
        {
            $facet: {
                paginatedFeeds: [
                    {
                        $lookup: {
                            from: 'posts',
                            localField: 'following',
                            foreignField: 'userId',
                            as: 'posts',
                        },
                    },
                    {
                        $unwind: '$posts',
                    },
                
                    {
                        $replaceRoot: { newRoot: '$posts' },
                    },
                    {
                        $lookup:{
                            from:'users',
                            localField:'userId',
                            foreignField:'_id',
                            as:'user'
                        }
                    },
                    {
                        $unwind:'$user'
                    },
                    
                    {
                        $sort: { createdAt: -1 },
                    },
                    {
                        $skip: (page - 1) * limit,
                    },
                    {
                        $limit: limit,
                    },
                ],
                totalCount: [
                    {
                        $lookup: {
                            from: 'posts',
                            localField: 'following',
                            foreignField: 'userId',
                            as: 'posts',
                        },
                    },
                    {
                        $unwind: '$posts',
                    },
                    {
                        $group: {
                            _id: null,
                            totalCount: { $sum: 1 },
                        },
                    },
                   
                   
                ],
            },
        },
        {
            $project: {
                paginatedFeeds: 1,
                totalCount: { $arrayElemAt: ['$totalCount.totalCount', 0] },
            },
        },
    ]);

    
    
    const {paginatedFeeds,totalCount} = result as {paginatedFeeds:(IPost &{user:IUser})[],totalCount:number};
    

    return {posts:paginatedFeeds,totalPosts:totalCount};

};