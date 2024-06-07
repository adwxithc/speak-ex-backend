import { BadRequestError } from '../../errors';
import { INotificationRepository } from '../../interface/repository/INotification';
import { IPostRepository } from '../../interface/repository/IPostRepository';
import { ISocketRepository } from '../../interface/repository/ISocketRepository';
import { IUserRepository } from '../../interface/repository/IUserRepository';
import { IFileBucket } from '../../interface/services/IFileBucket';
import { ISocketService } from '../../interface/services/ISocketService';

export const upvote = async ({
    postRepository,
    fileBucket,
    userRePository,
    notificationRepository,
    postId,
    userId,
    socketService,
    socketRepository,
}: {
    postRepository: IPostRepository;
    fileBucket: IFileBucket;
    userRePository: IUserRepository;
    notificationRepository: INotificationRepository;
    postId: string;
    userId: string;
    socketService: ISocketService;
    socketRepository: ISocketRepository;
}) => {
    const userPromise = userRePository.findUserById(userId);
    const postPromise = postRepository.upvote({ postId, userId });

    const [user, post] = await Promise.all([userPromise, postPromise]);
    if (!user || !user.id) throw new BadRequestError('invalid user');

    if (!post) throw new BadRequestError('invalid post');

    const message = `your post "${post?.title}" has been liked by ${
        user?.firstName + ' ' + user?.lastName
    }`;

    post.image = fileBucket.getFileAccessURL(post.image || '');

    const notification = await notificationRepository.createNotification({
        message,
        actionCreator: userId,
        userId: post.userId.toString(),
        read: false,
        relatedEntity: post.id?.toString() as string,
        title: 'liked your post',
        type: 'POST_LIKE',
    });
    const socketUser = await socketRepository.getUser(
        notification.userId.toString()
    );
    if (socketUser) {
        socketService.notifyUser({
            notificationId: notification.id?.toString() as string,
            socketId: socketUser.socketId,
        });
    }

    return post;
};
