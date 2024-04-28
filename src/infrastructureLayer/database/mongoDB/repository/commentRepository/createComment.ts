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
    return await comment.save();
    
};
