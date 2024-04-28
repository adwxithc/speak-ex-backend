
import PostModel from '../../models/post';
 

export const removeComment = async ({
    postId,
    commentId,
    postModel
}:{
    postId: string,
    commentId:string,
    postModel: typeof PostModel
}
): Promise<boolean> => {

    const res=await postModel.updateOne({_id:postId},{ $pull: { comments: commentId } },{ new: true });

    return res.modifiedCount>0;

};
