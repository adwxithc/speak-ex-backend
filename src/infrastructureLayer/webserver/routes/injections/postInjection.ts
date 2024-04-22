
import { PostController } from '../../../../controller/postAdapter';
import { PostUseCase } from '../../../../usecaseLayer/useCases/postUseCase';
import PostModel from '../../../database/mongoDB/models/post';
import UserModel from '../../../database/mongoDB/models/userModel';
import { UserRepository } from '../../../database/mongoDB/repository/UserRepository';
import { PostRepository } from '../../../database/mongoDB/repository/postRepository';
import { FileBucket } from '../../../services/fileBucket';


const postRepository = new PostRepository(PostModel);
const userRepository = new UserRepository(UserModel);
const fileBucket = new FileBucket();

const postUseCase = new PostUseCase({
    fileBucket,
    userRepository,
    postRepository,
});

const postController = new PostController(postUseCase);

export { postController };