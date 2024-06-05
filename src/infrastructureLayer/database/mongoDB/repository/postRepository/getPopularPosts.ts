import IPost from '../../../../../domain/post';
import PostModel from '../../models/post';

export const getPopularPosts = async (postModel: typeof PostModel) => {
    const result = await postModel.aggregate([
        {
            $addFields: {
                upvoteCount: { $size: '$upvotes' },
            },
        },
        {
            $sort: { upvoteCount: -1 },
        },
        {
            $limit: 5,
        },

        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userData',
            },
        },
        {
            $unwind: '$userData',
        },
        {
            $project: {
                _id: 0,
                id: '$_id',
                image: 1,
                title: 1,
                upvotes: 1,
                createdAt: 1,
                userId: 1,
                userData: {
                    firstName: 1,
                    lastName: 1,
                    profile: 1,
                    userName: 1,
                },
            },
        },
    ]);
    return result as (IPost & {userData: {firstName: string;lastName: string;profile: string;userName: string;}})[];
};
