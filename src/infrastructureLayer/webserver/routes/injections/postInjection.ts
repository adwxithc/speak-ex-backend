import { PostController } from '../../../../controller/restController/postController';
import { PostUseCase } from '../../../../usecaseLayer/useCases/postUseCase';
import NotificationModel from '../../../database/mongoDB/models/NotificationModel';
import TagModel from '../../../database/mongoDB/models/TagModel';
import CommentModel from '../../../database/mongoDB/models/commentModel';
import PostModel from '../../../database/mongoDB/models/post';
import UserModel from '../../../database/mongoDB/models/userModel';
import { NotificationRepository } from '../../../database/mongoDB/repository/NotificationRepository';
import { SocketRepository } from '../../../database/mongoDB/repository/SocketRepository';
import { TageRepository } from '../../../database/mongoDB/repository/TagRepository';
import { UserRepository } from '../../../database/mongoDB/repository/UserRepository';
import { CommentRepository } from '../../../database/mongoDB/repository/commentRepository';
import { PostRepository } from '../../../database/mongoDB/repository/postRepository';
import { FileBucket } from '../../../services/fileBucket';
import { SocketService } from '../../../services/socketService';
import { redisClient } from '../../config/redis';

const postRepository = new PostRepository(PostModel);
const userRepository = new UserRepository(UserModel);
const tagRepository = new TageRepository(TagModel);
const commentRepository = new CommentRepository(CommentModel);
const notificationRepository = new NotificationRepository(NotificationModel);
const fileBucket = new FileBucket();
const socketRepository= new SocketRepository(redisClient);
const socketService= new SocketService();

const postUseCase = new PostUseCase({
    fileBucket,
    userRepository,
    tagRepository,
    postRepository,
    notificationRepository,
    commentRepository,
    socketRepository,
    socketService
});

const postController = new PostController(postUseCase);

export { postController };
