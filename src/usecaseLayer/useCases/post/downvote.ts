
import { BadRequestError } from '../../errors';
import { IPostRepository } from '../../interface/repository/IPostRepository';
import { IFileBucket } from '../../interface/services/IFileBucket';

export const downvote = async ({
    postRepository,
    fileBucket,
    postId,
    userId
}: {
    postRepository: IPostRepository;
    fileBucket: IFileBucket;
    postId: string;
    userId:string
}) => {
   
    const post  = await postRepository.downvote({postId,userId});
    if(!post) throw new BadRequestError('invalid post');
    post.image=fileBucket.getFileAccessURL(post.image || '');
    return post;
};
 