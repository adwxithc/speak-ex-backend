import IPost from '../../domain/post';
import IUser from '../../domain/user';
import { IPostRepository } from '../interface/repository/IPostRepository';
import { IUserRepository } from '../interface/repository/IUserRepository';
import { IFileBucket } from '../interface/services/IFileBucket';
import { IPostUseCase } from '../interface/usecase/postUseCase';
import { createPost, getUsersPosts, getPost,upvote } from './post';
export class PostUseCase implements IPostUseCase {
    private readonly postRepository: IPostRepository;
    private readonly userRepository: IUserRepository;
    private readonly fileBucket: IFileBucket;

    constructor({
        postRepository,
        userRepository,
        fileBucket,
    }: {
        postRepository: IPostRepository;
        userRepository: IUserRepository;
        fileBucket: IFileBucket;
    }) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.fileBucket = fileBucket;
    }

    async createPost({
        title,
        content,
        imageFile,
        userId,
    }: {
        title: string;
        content: string;
        imageFile: Express.Multer.File;
        userId: string;
    }): Promise<IPost> {
        return await createPost({
            content,
            fileBucket: this.fileBucket,
            imageFile,
            postRepository: this.postRepository,
            userRepository: this.userRepository,
            title,
            userId,
        });
    }

    async getUsersPosts({
        userName,
    }: {
        userName: string;
    }): Promise<{ posts: IPost[]; user: IUser }> {
        return await getUsersPosts({
            fileBucket: this.fileBucket,
            postRepository: this.postRepository,
            userRePository: this.userRepository,
            userName,
        });
    }

    async getPost({ postId }: { postId: string }): Promise<IPost & {user:{userName:string,email:string,profile:string}} | null> {
        return await getPost({
            fileBucket: this.fileBucket,
            postRepository: this.postRepository,
            postId,
        });
    }
    async upvote({ postId,userId }: { postId: string;userId:string }): Promise<IPost> {
        return await upvote({
            fileBucket: this.fileBucket,
            postRepository: this.postRepository,
            postId,
            userId
        });
    }
}
