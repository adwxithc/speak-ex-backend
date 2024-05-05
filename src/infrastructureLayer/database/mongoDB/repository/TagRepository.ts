
import { ITagRepository } from '../../../../usecaseLayer/interface/repository/ITagRepository';
import TagModel from '../models/TagModel';
import { addTag, getTags } from './tagRepository/';



export class TageRepository implements ITagRepository {
    constructor(private tagModel: typeof TagModel) {}


    async addTag({ tags }: { tags: string[]; }): Promise<void> {
        return await addTag({tags,tagModel:this.tagModel});
    }

    async getTags({ page, limit, key }: { page: number; limit: number; key: string; }){
        return await getTags({ page, limit, key,tagModel:this.tagModel });
    }
}
