
import { BadRequestError } from '../../errors';
import { ICommentRepository } from '../../interface/repository/ICommentRepository';
import { IPostRepository } from '../../interface/repository/IPostRepository';


export const deleteComment = async ({
    postRepository,
    commetnRepository,
    commentId,
    userId
}: {
    postRepository: IPostRepository,
    commetnRepository:ICommentRepository,
    commentId:string,
    userId:string
}) => {
   
    const comment = await commetnRepository.findById(commentId);
    

    if(!comment || comment?.userId.toString()!==userId) throw new BadRequestError('access denied');

    const res = await commetnRepository.deleteComment({commentId});
    if(!res) throw new BadRequestError('invalid request');

    return await postRepository.removeComment({commentId,postId:comment.postId.toString()});

};
 