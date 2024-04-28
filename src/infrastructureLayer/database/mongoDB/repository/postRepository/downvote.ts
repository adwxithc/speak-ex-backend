
import IPost from '../../../../../domain/post';
import PostModel from '../../models/post';
 

export const downvote = async ({
    postId,
    userId,
    postModel
}:{
    postId: string,
    userId:string,
    postModel: typeof PostModel
}
): Promise<IPost | null> => {



    return await postModel.findByIdAndUpdate({_id:postId},{ $pull: { upvotes: userId } },{ new: true });

};
