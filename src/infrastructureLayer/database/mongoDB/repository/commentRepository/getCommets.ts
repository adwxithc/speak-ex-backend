import { IComment } from '../../../../../domain/comment';
import CommentModel from '../../models/commentModel';


export const getComments = async (
    {
        limit,
        page,
        postId,
        commentModel
      
    }: { page: number; limit: number; postId:string, commentModel:typeof CommentModel},

): Promise<{comments:IComment[],totalComments:number}> => {


    const comments = await commentModel
        .find({postId, parentId:null})
        .sort({ updatedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);


    const totalComments = await commentModel.countDocuments({postId, parentId:null});

    return { comments, totalComments };
};
