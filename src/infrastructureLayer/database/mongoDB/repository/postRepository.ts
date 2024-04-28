
import IPost from '../../../../domain/post';
import { IPostRepository } from '../../../../usecaseLayer/interface/repository/IPostRepository';
import PostModel from '../models/post';
import { createPost, getPost, getUsersPosts, upvote } from './postRepository/';

export class PostRepository implements IPostRepository {
    constructor(private postModel: typeof PostModel) {}

    async createPost(newPost: IPost): Promise<IPost | never> {
        return await createPost(newPost, this.postModel);
    }

    async getUsersPosts(userId: string): Promise<IPost[]> {
        return await getUsersPosts(userId, this.postModel);
    }

    async getPost(postId: string): Promise<IPost & {user:{userName:string,email:string,profile:string}} | null>{
        return await getPost(postId, this.postModel);
    }

    upvote({ postId, userId }: { postId: string; userId: string; }): Promise<IPost | null> {
        return upvote({
            postId,
            userId,
            postModel:this.postModel
        });
    }
}
