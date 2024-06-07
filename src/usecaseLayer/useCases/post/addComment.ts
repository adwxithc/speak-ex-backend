import { IComment } from '../../../domain/comment';
import INotification from '../../../domain/notification';
import { BadRequestError } from '../../errors';
import { ICommentRepository } from '../../interface/repository/ICommentRepository';
import { INotificationRepository } from '../../interface/repository/INotification';
import { IPostRepository } from '../../interface/repository/IPostRepository';
import { ISocketRepository } from '../../interface/repository/ISocketRepository';
import { ISocketService } from '../../interface/services/ISocketService';

export const addComment = async ({
    postRepository,
    commetnRepository,
    text,
    postId,
    userId,
    parentId,
    notificationRepository,
    socketRepository,
    socketService,
}: {
    postRepository: IPostRepository;
    commetnRepository: ICommentRepository;
    notificationRepository: INotificationRepository;
    text: string;
    postId: string;
    userId: string;
    parentId: string;
    socketRepository: ISocketRepository;
    socketService: ISocketService;
}) => {
    const post =await postRepository.getPost(postId);


    if (!post) throw new BadRequestError('invalid post');
    

    const comment = {
        parentId,
        text,
        userId,
        postId,
    };

    const newComment = await commetnRepository.createComment(
        comment as unknown as IComment
    );

    const message = `${
        post.user?.userName 
    } has commented on your post "${post?.title}"`;

    const socketUserPromise =  socketRepository.getUser(
        post.userId.toString()
    );

    const notificationPromise = notificationRepository.createNotification({
        message,
        actionCreator: userId,
        userId: post.userId.toString(),
        read: false,
        relatedEntity: post.id?.toString() as string,
        title: 'commented on your post',
        type: 'POST_COMMENT',
    });

    let notification: INotification,
        socketUser: { userId: string; socketId: string } | null;

    if (!parentId) {
        const updatePostPromise = postRepository.insertComment({
            postId,
            commentId: newComment?.id as string,
        });
        [notification, socketUser] = await Promise.all([
            notificationPromise,
            socketUserPromise,
            updatePostPromise,
        ]);
    } else {
        [notification, socketUser] = await Promise.all([
            notificationPromise,
            socketUserPromise,
        ]);
    }

    if (socketUser) {
        socketService.notifyUser({
            notificationId: notification.id?.toString() as string,
            socketId: socketUser.socketId,
        });
    }

    return newComment;
};
