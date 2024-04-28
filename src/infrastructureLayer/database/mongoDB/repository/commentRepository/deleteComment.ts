import CommentModel from '../../models/commentModel';

export const deleteComment = async ({
    commentId,
    commentModel,
}: {
    commentId: string;
    commentModel: typeof CommentModel;
}): Promise<boolean> => {
    const result = await commentModel.deleteOne({ _id: commentId });

    return result.deletedCount > 0;
};
