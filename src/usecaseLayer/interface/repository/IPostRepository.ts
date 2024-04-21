import IPost from '../../../domain/post';

export interface IPostRepository{
    createPost(newPost:IPost): Promise<IPost | never>
}