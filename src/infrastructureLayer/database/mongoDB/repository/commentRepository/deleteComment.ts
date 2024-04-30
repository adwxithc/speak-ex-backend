import CommentModel from '../../models/commentModel';

export const deleteComment = async ({
    commentId,
    commentModel,
}: {
    commentId: string;
    commentModel: typeof CommentModel;
}): Promise<boolean> => {
    const result = await commentModel.findByIdAndDelete({ _id: commentId });
    
    if(result?.parentId){
        await commentModel.updateOne({_id:result.parentId},{$inc:{replys:1}});
    }else{
        await commentModel.deleteMany({parentId:result?._id});
    }

    return !!result;
};
