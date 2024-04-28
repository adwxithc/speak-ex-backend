
import { IComment } from '../../../domain/comment';
import { BadRequestError } from '../../errors';
import { ICommentRepository } from '../../interface/repository/ICommentRepository';
import { IPostRepository } from '../../interface/repository/IPostRepository';


export const addComment = async ({

    postRepository,
    commetnRepository,
    text,
    postId,
    userId,
    parentId
}: {
    postRepository: IPostRepository;
    commetnRepository:ICommentRepository;
    text: string;
    postId: string;
    userId: string;
    parentId:string
}) => {

    const post = await postRepository.getPost(postId);
    if(!post) throw new BadRequestError('invalid post');

    const comment = {
        parentId,
        text,
        userId,
        postId
    };
    
    
    const newComment = await commetnRepository.createComment(comment as unknown as IComment);
    if(!parentId){
        await postRepository.insertComment({postId,commentId:newComment?.id as string});
    }
    
    return newComment;
};
