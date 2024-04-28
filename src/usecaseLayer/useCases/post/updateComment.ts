import { BadRequestError } from '../../errors';
import { ICommentRepository } from '../../interface/repository/ICommentRepository';

export const updateComment = async ({
    commentRepository,
    postId,
    commentId,
    text,
    userId,
}: {
    commentRepository: ICommentRepository;
    postId: string;
    commentId: string;
    text: string;
    userId: string;
}) => {

    const comment = await commentRepository.findById(commentId);
    if(!comment || comment.userId.toString()!==userId) throw new BadRequestError('access denied');

    return await commentRepository.updateComment({
        postId,
        commentId,
        text,
    });
};
