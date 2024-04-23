import { BadRequestError } from '../../errors';
import { IPostRepository } from '../../interface/repository/IPostRepository';
import { IUserRepository } from '../../interface/repository/IUserRepository';
import { IFileBucket } from '../../interface/services/IFileBucket';

export const getUsersPosts = async ({
    postRepository,
    userRePository,
    fileBucket,
    userName,
}: {
    postRepository: IPostRepository;
    userRePository: IUserRepository;
    fileBucket: IFileBucket;
    userName: string;
}) => {
    const user = await userRePository.findUserByUserName(userName);

    if (!user) throw new BadRequestError('invalid user name');
    const posts = await postRepository.getUsersPosts(user.id as string);
    const postsWithUrl = posts.map((post) => {
        if (post.image) post.image = fileBucket.getFileAccessURL(post.image);

        return post;
    });
    return { posts: postsWithUrl, user };
};
