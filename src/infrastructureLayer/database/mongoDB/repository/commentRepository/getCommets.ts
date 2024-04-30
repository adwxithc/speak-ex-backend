
import mongoose from 'mongoose';
import { IComment } from '../../../../../domain/comment';
import CommentModel from '../../models/commentModel';

export const getComments = async ({
    limit,
    page,
    postId,
    parentId,
    commentModel,
}: {
    page: number;
    limit: number; 
    postId: string;
    parentId:string| null;
    commentModel: typeof CommentModel;
}): Promise<{comments:IComment & {user:{userName:string,profile:string}}[],totalComments:number}> => {

    const formatedParentId= parentId && mongoose.Types.ObjectId.isValid(parentId)?new mongoose.Types.ObjectId(parentId):null;
    const sortOrder=formatedParentId?1:-1;
    const comments = await commentModel.aggregate([
        {
            $match: {
                postId:new mongoose.Types.ObjectId(postId),
                parentId: formatedParentId,
            },
        },
        {
            $sort: { createdAt: sortOrder },
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
            $addFields: {
                'user.id': '$user._id',
                'id':'$_id'
            },
        },
        { 
            $project: { 'user.userName': 1,'user.profile':1,postId:1,text:1,parentId:1,createdAt:1, replys:1,'user.id':1,id:1,_id:0 },
        },
    ]) as IComment & {user:{ userName: string; profile: string; }}[] ;

    const totalComments = await commentModel.countDocuments({
        postId,
        parentId:formatedParentId,
    });

    return { comments, totalComments }; 
};
