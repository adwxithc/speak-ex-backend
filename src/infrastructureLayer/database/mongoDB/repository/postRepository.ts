import IPost from '../../../../domain/post';
import { IPostRepository } from '../../../../usecaseLayer/interface/repository/IPostRepository';
import PostModel from '../models/post';
import {
    createPost,
    getPost,
    getUsersPosts,
    upvote,
    downvote,
    insertComment,
    removeComment,
    getPopularPosts,
} from './postRepository/';
import { getPostsInfo } from './postRepository/getPostsInfo';

export class PostRepository implements IPostRepository {
    constructor(private postModel: typeof PostModel) {}

    async createPost(newPost: IPost): Promise<IPost | never> {
        return await createPost(newPost, this.postModel);
    }

    async getUsersPosts(userId: string): Promise<IPost[]> {
        return await getUsersPosts(userId, this.postModel);
    }

    async getPost(postId: string) {
        return await getPost(postId, this.postModel);
    }

    async upvote({
        postId,
        userId,
    }: {
        postId: string;
        userId: string;
    }): Promise<IPost | null> {
        return upvote({
            postId,
            userId,
            postModel: this.postModel,
        });
    }

    async downvote({
        postId,
        userId,
    }: {
        postId: string;
        userId: string;
    }): Promise<IPost | null> {
        return downvote({
            postId,
            userId,
            postModel: this.postModel,
        });
    }

    async insertComment({
        postId,
        commentId,
    }: {
        postId: string;
        commentId: string;
    }): Promise<IPost | null> {
        return insertComment({
            postId,
            commentId,
            postModel: this.postModel,
        });
    }

    async removeComment({
        postId,
        commentId,
    }: {
        postId: string;
        commentId: string;
    }): Promise<boolean> {
        return await removeComment({
            postId,
            commentId,
            postModel: this.postModel,
        });
    }

    async getPostsInfo({ userId }: { userId: string }) {
        return await getPostsInfo({ userId, postModel: this.postModel });
    }

    async getPopularPost() {
        return await getPopularPosts(this.postModel);
    }
}
