
import IPost from '../../../../../domain/post';
import PostModel from '../../models/post';
 

export const getPopularPosts = async (
    postModel: typeof PostModel
) => {
    const result = await postModel.aggregate([
        {
            $addFields: {
                upvoteCount: { $size: '$upvotes' }
            }
        },
        {
            $sort: { upvoteCount: -1 }
        },
        {
            $limit: 5
        },
        {
            $project:{
                _id:0,
                id:'$_id',
                image:1,
                title:1,
                upvotes:1,
                createdAt:1
            }
        }
    ]);
    return result as IPost[];
};
