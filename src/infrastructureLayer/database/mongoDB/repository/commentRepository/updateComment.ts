import { IComment } from '../../../../../domain/comment';
import CommentModel from '../../models/commentModel';

export const updateComment = async ({
    commentId,
    postId,
    text,
    commentModel,
}: {
    commentId: string;
    postId:string;
    text:string;
    commentModel: typeof CommentModel;
}): Promise<IComment | null> => {
    return await commentModel.findOneAndUpdate({ _id: commentId, postId: postId }, { $set: { text: text } },{new:true});
};
