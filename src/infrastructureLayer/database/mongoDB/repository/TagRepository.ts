import { ITagRepository } from '../../../../usecaseLayer/interface/repository/ITagRepository';
import TagModel from '../models/TagModel';
import { addTag, getPopularPosts, getTags } from './tagRepository/';

export class TageRepository implements ITagRepository {
    constructor(private tagModel: typeof TagModel) {}

    async addTag({ tags }: { tags: string[] }): Promise<void> {
        return await addTag({ tags, tagModel: this.tagModel });
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
        return await getTags({ page, limit, key, tagModel: this.tagModel });
    }

    async getPopularPosts({ page, limit }: { page: number; limit: number }) {
        return await getPopularPosts({ page, limit, tagModel: this.tagModel });
    }
}
