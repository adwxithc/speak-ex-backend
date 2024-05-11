import { ITagRepository } from '../../interface/repository/ITagRepository';
import { IUserRepository } from '../../interface/repository/IUserRepository';
import { IFileBucket } from '../../interface/services/IFileBucket';

export const getFeed = async ({
    page,
    limit,
    userRepository,
    tagRepository,
    fileBucket,
    userId,
}: {
    page: number;
    limit: number;
    userRepository: IUserRepository;
    tagRepository: ITagRepository;
    fileBucket: IFileBucket;
    userId: string;
}) => {
    const posts = [];
    let totalPosts = 0;
    const { posts: followingPosts, totalPosts: totalFollowingPosts } =
        await userRepository.getFollowingPosts({ limit, page, userId });

    posts.push(...followingPosts);
    totalPosts += totalFollowingPosts || 0;

    

    const lastPageInFolllowingPosts = (totalFollowingPosts || 0) / limit;

    if (followingPosts.length < limit) {
        const newPage = Math.ceil(page - (lastPageInFolllowingPosts<1?0:lastPageInFolllowingPosts));
        const newLimit = limit - followingPosts.length;
        
        
        const { posts: popularPosts, totalPosts: totalPopularPosts } =
            await tagRepository.getPopularPosts({
                limit: newLimit,
                page: newPage,
            });
        totalPosts += totalPopularPosts;

        posts.push(...popularPosts);
    }

    posts.forEach((post) => {
        post.image = fileBucket.getFileAccessURL(post?.image || '');
        post.user.profile = fileBucket.getFileAccessURL(
            post?.user?.profile || ''
        );
    });
    return { posts, totalPosts };
};
