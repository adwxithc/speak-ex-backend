
import { ICommentRepository } from '../../interface/repository/ICommentRepository';
import { IFileBucket } from '../../interface/services/IFileBucket';


export const getComments = async ({
    page,
    limit,
    postId,
    parentId,
    commentRepository,
    fileBucket
}: {
    page:number,
    limit:number,
    postId:string,
    parentId:string |null,
    commentRepository:ICommentRepository,
    fileBucket:IFileBucket
}) => {
    const res= await commentRepository.getComments({limit,page,postId,parentId});

    res.comments.forEach(com => {
        com.user.profile=fileBucket.getFileAccessURL(com.user.profile);
    });
   
    
    return res;
};
 