import PostModel from '../models/post';
import IPost from '../../../../domain/post';
import { IPostRepository } from '../../../../usecaseLayer/interface/repository/IPostRepository';
import { createPost, getPost, getUsersPosts } from './postRepository/';

export class PostRepository implements IPostRepository {
    constructor(private postModel: typeof PostModel) {}

    async createPost(newPost: IPost): Promise<IPost | never> {
        return await createPost(newPost, this.postModel);
    }

    async getUsersPosts(userId: string): Promise<IPost[]> {
        return await getUsersPosts(userId, this.postModel);
    }

    async getPost(postId: string): Promise<IPost | null> {
        return await getPost(postId, PostModel);
    }
}
