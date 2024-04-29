
import mongoose from 'mongoose';
import { IComment } from '../../../../../domain/comment';
import CommentModel from '../../models/commentModel';

export const getComments = async ({
    limit,
    page,
    postId,
    commentModel,
}: {
    page: number;
    limit: number;
    postId: string;
    commentModel: typeof CommentModel;
}): Promise<{comments:IComment & {userName:string,profile:string}[],totalComments:number}> => {


    console.log(postId);
    
    const comments = await commentModel.aggregate([
        {
            $match: {
                postId:new mongoose.Types.ObjectId(postId),
                parentId: null,
            },
        },
        {
            $sort: { updatedAt: -1 },
        },
        { $skip: (page - 1) * limit },
        { $limit: limit },
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
            $project: { 'user.userName': 1,'user.profile':1,postId:1,text:1,parentId:1,createdAt:1 },
        },
    ]) as IComment & { userName: string; profile: string; }[] ;

    const totalComments = await commentModel.countDocuments({
        postId,
        parentId: null,
    });

    return { comments, totalComments };
};
