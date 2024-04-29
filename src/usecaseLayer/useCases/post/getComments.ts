
import { ICommentRepository } from '../../interface/repository/ICommentRepository';


export const getComments = async ({
    page,
    limit,
    postId,
    commentRepository,
}: {
    page:number,
    limit:number,
    postId:string,
    commentRepository:ICommentRepository,
}) => {
    return await commentRepository.getComments({limit,page,postId});
};
 