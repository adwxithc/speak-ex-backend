import ITag from '../../../domain/Tag';
import { IComment } from '../../../domain/comment';
import IPost from '../../../domain/post';
import IUser from '../../../domain/user';

export interface IPostUseCase {
    createPost({
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
    }): Promise<IPost | never>;
    getUsersPosts({
        userName,
    }: {
        userName: string;
    }): Promise<{ posts: IPost[]; user: IUser }>;
    getPost({ postId }: { postId: string }): Promise<
        | (IPost & {
              user: { userName: string; email: string; profile: string };
          })
        | null
    >;
    upvote({
        postId,
        userId,
    }: {
        postId: string;
        userId: string;
    }): Promise<IPost | never>;
    downvote({
        postId,
        userId,
    }: {
        postId: string;
        userId: string;
    }): Promise<IPost | never>;

    addComment({
        postId,
        userId,
        text,
        parentId,
    }: {
        postId: string;
        userId: string;
        text: string;
        parentId: string;
    }): Promise<IComment | null>;
    deleteComment({
        commentId,
        userId,
    }: {
        commentId: string;
        userId: string;
    }): Promise<boolean>;
    updateComment({
        postId,
        commentId,
        userId,
        text,
    }: {
        postId: string;
        commentId: string;
        userId: string;
        text: string;
    }): Promise<IComment | null>;
    getComments({
        page,
        limit,
        postId,
        parentId,
    }: {
        page: number;
        limit: number;
        postId: string;
        parentId: string | null;
    }): Promise<{
        comments: IComment & { user: { userName: string; profile: string } }[];
        totalComments: number;
    }>;
    getTags({
        page,
        limit,
        key,
    }: {
        page: number;
        limit: number;
        key: string;
    }): Promise<{ tags: ITag[]; totalTags: number }>;
    getFeed({
        page,
        limit,
        userId,
    }: {
        page: number;
        limit: number;
        userId: string;
    }): Promise<{ posts: IPost[]; totalPosts: number }>;
}
