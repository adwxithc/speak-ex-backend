import { PostController } from '../../../../controller/postAdapter';
import { PostUseCase } from '../../../../usecaseLayer/useCases/postUseCase';
import TagModel from '../../../database/mongoDB/models/TagModel';
import CommentModel from '../../../database/mongoDB/models/commentModel';
import PostModel from '../../../database/mongoDB/models/post';
import UserModel from '../../../database/mongoDB/models/userModel';
import { TageRepository } from '../../../database/mongoDB/repository/TagRepository';
import { UserRepository } from '../../../database/mongoDB/repository/UserRepository';
import { CommentRepository } from '../../../database/mongoDB/repository/commentRepository';
import { PostRepository } from '../../../database/mongoDB/repository/postRepository';
import { FileBucket } from '../../../services/fileBucket';

const postRepository = new PostRepository(PostModel);
const userRepository = new UserRepository(UserModel);
const tagRepository = new TageRepository(TagModel);
const commentRepository = new CommentRepository(CommentModel);
const fileBucket = new FileBucket();

const postUseCase = new PostUseCase({
    fileBucket,
    userRepository,
    tagRepository,
    postRepository,

    commentRepository,
});

const postController = new PostController(postUseCase);

export { postController };
