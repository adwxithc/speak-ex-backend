import { BadRequestError } from '../../errors';
import { INotificationRepository } from '../../interface/repository/INotification';
import { IPostRepository } from '../../interface/repository/IPostRepository';
import { IUserRepository } from '../../interface/repository/IUserRepository';
import { IFileBucket } from '../../interface/services/IFileBucket';

export const upvote = async ({
    postRepository,
    fileBucket,
    userRePository,
    notificationRepository,
    postId,
    userId,
}: {
    postRepository: IPostRepository;
    fileBucket: IFileBucket;
    userRePository: IUserRepository;
    notificationRepository: INotificationRepository;
    postId: string;
    userId: string;
}) => {
    const userPromise =  userRePository.findUserById(userId);
    const postPromise =  postRepository.upvote({ postId, userId });

    const [user, post] = await Promise.all([userPromise, postPromise]);
    if (!user || !user.id) throw new BadRequestError('invalid user');

    if (!post) throw new BadRequestError('invalid post');

    const message = `your post "${post?.title}" has been liked by ${
        user?.firstName + ' ' + user?.lastName
    }`;
    
    post.image = fileBucket.getFileAccessURL(post.image || '');

    await notificationRepository.createNotification({
        message,
        actionCreator: userId,
        userId: post.userId.toString(),
        read: false,
        relatedEntity: post.id?.toString() as string,
        title: 'got one new like',
        type: 'POST_LIKE',
    });

    
    return post;
};
