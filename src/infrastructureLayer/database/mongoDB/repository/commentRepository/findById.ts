import { IComment } from '../../../../../domain/comment';
import CommentModel from '../../models/commentModel';

export const findById = async ({
    commentId,
    commentModel,
}: {
    commentId: string;
    commentModel: typeof CommentModel;
}): Promise<IComment | null> => {
    
    return await commentModel.findById({_id:commentId});
    
};
