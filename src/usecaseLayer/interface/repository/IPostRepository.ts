import IPost from '../../../domain/post';

export interface IPostRepository{
    createPost(newPost:IPost): Promise<IPost | never>
    getUsersPosts(userId:string): Promise<IPost[] | never>
    getPost(postId:string):Promise<IPost | null>
}