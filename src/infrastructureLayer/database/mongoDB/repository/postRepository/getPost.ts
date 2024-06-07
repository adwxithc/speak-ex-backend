import mongoose from 'mongoose';
import IPost from '../../../../../domain/post';
import PostModel from '../../models/post';
 

export const getPost = async (
    postId: string,
    postModel: typeof PostModel
): Promise<IPost & {user:{userName:string,email:string,profile:string}} | null> => {
    
    const [postData] = await postModel.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(postId),
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user',
            },
        },
        {
            $unwind: '$user',
        },
        {
            $project: {
                
                id:'$_id',
                _id: 0,
                title: 1,
                content: 1,
                userId:1,
                image: 1,
                upvotes: 1,
                comments: 1,
                createdAt: 1,
                updatedAt: 1,
                'user.userName': 1,
                'user.email': 1,
                'user.profile': 1,
                'user.followers':1,
                'user.id':'$user._id'
            },
        },
    ]);

    return postData;
};
