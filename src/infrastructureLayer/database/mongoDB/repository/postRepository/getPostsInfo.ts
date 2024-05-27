import mongoose from 'mongoose';
import PostModel from '../../models/post';

export const getPostsInfo = async ({
    userId,
    postModel,
}: {
    userId: string;
    postModel: typeof PostModel;
}) => {

    const postStats = await postModel.aggregate([
        {
            $match: { userId: new mongoose.Types.ObjectId(userId) }
        },
        {
            $group: {
                _id: null,
                posts: { $sum: 1 },
                totalLikes: { $sum: { $size: '$upvotes' } }
            }
        },
        {
            $project: {
                _id: 0, // Exclude the default _id field
                posts: 1,
                averageLikes: { $cond: { if: { $eq: ['$totalPosts', 0] }, then: 0, else: { $divide: ['$totalLikes', '$totalPosts'] } } }
            }
        }
    ]) as {posts:number ; averageLikes:number}[];

    if (postStats.length === 0) {
        return {
            posts: 0,
            averageLikes: 0
        };
    }

    return postStats[0];
};
