import { IComment } from '../../../../../domain/comment';
import CommentModel from '../../models/commentModel';

export const createComment = async ({
    newComment,
    commentModel,
}: {
    newComment: IComment;
    commentModel: typeof CommentModel;
}): Promise<IComment | never> => {
    const comment = await commentModel.create(newComment);
    const res= await comment.save();
    if(res.parentId){
        
        
        await commentModel.updateOne({_id:res.parentId},{$inc:{replys:1}}); 
  
    }
    
    return res;
    
};
