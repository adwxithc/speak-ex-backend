import { BadRequestError } from '../../errors';
import { IPostRepository } from '../../interface/repository/IPostRepository';
import { IFileBucket } from '../../interface/services/IFileBucket';

export const getPost = async ({
    postRepository,
    fileBucket,
    postId,
}: {
    postRepository: IPostRepository;
    fileBucket: IFileBucket;
    postId: string;
}) => {
    const post = await postRepository.getPost(postId);
    
    if (post) {
        post.image = fileBucket.getFileAccessURL(post.image as string);
        post.user.profile=fileBucket.getFileAccessURL(post.user.profile || '');
    } else {
        throw new BadRequestError('invalid post');
    }

    return post;
};
 