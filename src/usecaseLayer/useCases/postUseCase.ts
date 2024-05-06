import { IComment } from '../../domain/comment';
import IPost from '../../domain/post';
import IUser from '../../domain/user';
import { ICommentRepository } from '../interface/repository/ICommentRepository';
import { IPostRepository } from '../interface/repository/IPostRepository';
import { ITagRepository } from '../interface/repository/ITagRepository';
import { IUserRepository } from '../interface/repository/IUserRepository';
import { IFileBucket } from '../interface/services/IFileBucket';
import { IPostUseCase } from '../interface/usecase/postUseCase';
import {
    createPost,
    getUsersPosts,
    getPost,
    upvote,
    downvote,
    addComment,
    deleteComment,
    updateComment,
    getComments,
    getTags,
    getFeed,
} from './post';

export class PostUseCase implements IPostUseCase {
    private readonly postRepository: IPostRepository;
    private readonly tagRepository: ITagRepository;
    private readonly userRepository: IUserRepository;
    private readonly commentRepository: ICommentRepository;
    private readonly fileBucket: IFileBucket;

    constructor({
        postRepository,
        userRepository,
        tagRepository,
        fileBucket,
        commentRepository,
    }: {
        postRepository: IPostRepository;
        tagRepository: ITagRepository;
        userRepository: IUserRepository;
        fileBucket: IFileBucket;
        commentRepository: ICommentRepository;
    }) {
        this.postRepository = postRepository;
        this.tagRepository = tagRepository;
        this.userRepository = userRepository;
        this.fileBucket = fileBucket;
        this.commentRepository = commentRepository;
    }

    async createPost({
        title,
        content,
        tags,
        imageFile,
        userId,
    }: {
        title: string;
        content: string;
        tags: string;
        imageFile: Express.Multer.File;
        userId: string;
    }): Promise<IPost> {
        return await createPost({
            content,
            tags,
            fileBucket: this.fileBucket,
            imageFile,
            postRepository: this.postRepository,
            tagRepository: this.tagRepository,
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

    async getPost({ postId }: { postId: string }): Promise<
        | (IPost & {
              user: { userName: string; email: string; profile: string };
          })
        | null
    > {
        return await getPost({
            fileBucket: this.fileBucket,
            postRepository: this.postRepository,
            postId,
        });
    }
    async upvote({
        postId,
        userId,
    }: {
        postId: string;
        userId: string;
    }): Promise<IPost> {
        return await upvote({
            fileBucket: this.fileBucket,
            postRepository: this.postRepository,
            postId,
            userId,
        });
    }

    async downvote({
        postId,
        userId,
    }: {
        postId: string;
        userId: string;
    }): Promise<IPost> {
        return await downvote({
            fileBucket: this.fileBucket,
            postRepository: this.postRepository,
            postId,
            userId,
        });
    }

    async addComment({
        postId,
        userId,
        text,
        parentId,
    }: {
        postId: string;
        userId: string;
        text: string;
        parentId: string;
    }): Promise<IComment | null> {
        return await addComment({
            postRepository: this.postRepository,
            commetnRepository: this.commentRepository,
            text,
            postId,
            userId,
            parentId,
        });
    }

    async deleteComment({
        commentId,
        userId,
    }: {
        commentId: string;
        userId: string;
    }): Promise<boolean> {
        return await deleteComment({
            postRepository: this.postRepository,
            commetnRepository: this.commentRepository,
            commentId,
            userId,
        });
    }

    async updateComment({
        postId,
        commentId,
        userId,
        text,
    }: {
        postId: string;
        commentId: string;
        userId: string;
        text: string;
    }): Promise<IComment | null> {
        return await updateComment({
            postId,
            commentId,
            userId,
            text,
            commentRepository: this.commentRepository,
        });
    }

    async getComments({
        page,
        limit,
        postId,
        parentId,
    }: {
        page: number;
        limit: number;
        postId: string;
        parentId: string | null;
    }) {
        return await getComments({
            page,
            limit,
            postId,
            commentRepository: this.commentRepository,
            fileBucket: this.fileBucket,
            parentId,
        });
    }

    async getTags({
        page,
        limit,
        key,
    }: {
        page: number;
        limit: number;
        key: string;
    }) {
        return await getTags({
            page,
            limit,
            key,
            tagRepository: this.tagRepository,
        });
    }
    async getFeed({
        page,
        limit,
        userId,
    }: {
        page: number;
        limit: number;
        userId: string;
    }) {
        return await getFeed({
            page,
            limit,
            fileBucket: this.fileBucket,
            userId,
            userRepository: this.userRepository,
            tagRepository:this.tagRepository
        });
    }
}
