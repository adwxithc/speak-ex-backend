import PostModel from '../models/post';
import IPost from '../../../../domain/post';
import { IPostRepository } from '../../../../usecaseLayer/interface/repository/IPostRepository';
import { createPost } from './postRepository/createPost';

export class PostRepository implements IPostRepository{

    constructor(private postModel: typeof PostModel){}

    async createPost(newPost: IPost): Promise<IPost | never> {
        return await createPost(newPost, this.postModel);
    }
}