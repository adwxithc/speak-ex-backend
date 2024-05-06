import ITag from '../../../domain/Tag';
import IPost from '../../../domain/post';
import IUser from '../../../domain/user';

export interface ITagRepository {
    addTag({ tags }: { tags: string[] }): Promise<void>;
    getTags({
        page,
        limit,
        key,
    }: {
        page: number;
        limit: number;
        key: string;
    }): Promise<{ tags: ITag[]; totalTags: number }>;
    getPopularPosts({
        page,
        limit,
    }: {
        page: number;
        limit: number;
    }): Promise<{ posts: (IPost & { user: IUser })[]; totalPosts: number }>;
}
