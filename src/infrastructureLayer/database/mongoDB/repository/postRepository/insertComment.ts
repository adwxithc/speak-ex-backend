
import IPost from '../../../../../domain/post';
import PostModel from '../../models/post';
 

export const insertComment = async ({
    postId,
    commentId,
    postModel
}:{
    postId: string,
    commentId:string,
    postModel: typeof PostModel
}
): Promise<IPost | null> => {



    return await postModel.findByIdAndUpdate({_id:postId},{ $addToSet: { comments: commentId } },{ new: true });

};
