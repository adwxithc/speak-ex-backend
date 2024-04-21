
import { PostController } from '../../../../controller/postAdapter';
import { PostUseCase } from '../../../../usecaseLayer/useCases/postUseCase';
import PostModel from '../../../database/mongoDB/models/post';
import { PostRepository } from '../../../database/mongoDB/repository/postRepository';
import { FileBucket } from '../../../services/fileBucket';


const postRepository = new PostRepository(PostModel);
const fileBucket = new FileBucket();

const postUseCase = new PostUseCase({
    fileBucket,
    postRepository,
});

const postController = new PostController(postUseCase);

export { postController };