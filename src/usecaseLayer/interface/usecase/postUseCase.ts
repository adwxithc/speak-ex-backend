import IPost from '../../../domain/post';
import IUser from '../../../domain/user';

export interface IPostUseCase {
    createPost({
        title,
        content,
        imageFile,
        userId,
    }: {
        title: string;
        content: string;
        imageFile: Express.Multer.File;
        userId: string;
    }): Promise<IPost | never>;
    getUsersPosts({
        userName,
    }: {
        userName: string;
    }): Promise<{ posts: IPost[]; user: IUser }>;
    getPost({ postId }: { postId: string }): Promise<IPost>;
}
