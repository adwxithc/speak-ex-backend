import mongoose from 'mongoose';
import IPost from '../../../../../domain/post';
import PostModel from '../../models/post';

interface IUserInfo{
    userName:string,
    profile:string
}

export const getPost = async(
    postId : string,
    postModel:typeof PostModel
):Promise<(IPost & {user:IUserInfo}) | null>=>{

    // const post = await postModel.findById(postId);
    const [postData] = await postModel.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(postId) 
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user'
        },
        {
            $project: {
                _id: 0,
                title:1,
                content:1,
                image:1,
                likes:1,
                comments:1,
                createdAt:1,
                updatedAt:1,
                'user.userName':1,
                'user.profile':1
            }
        }
    ]);
    
    
    return postData;
};