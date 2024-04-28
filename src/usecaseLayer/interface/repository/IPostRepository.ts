import IPost from '../../../domain/post';


export interface IPostRepository {
    createPost(newPost: IPost): Promise<IPost | never>;
    getUsersPosts(userId: string): Promise<IPost[] | never>;
    getPost(postId: string): Promise<IPost & {user:{userName:string,email:string,profile:string}} | null>;
    upvote({postId,userId}:{postId:string, userId:string}):Promise<IPost | null>
}
