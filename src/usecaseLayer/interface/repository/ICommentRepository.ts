import { IComment } from '../../../domain/comment';



export interface ICommentRepository {
    createComment(newComment:IComment): Promise<IComment | null>;
    deleteComment({commentId}:{commentId:string}):Promise<boolean>
    findById(commentId:string):Promise<IComment | null>
    updateComment({postId, commentId, text}:{postId:string, commentId:string, text:string}):Promise<IComment | null>
    getComments({limit,page,postId,parentId}:{limit:number,page:number,postId:string,parentId:string|null}):Promise<{comments:IComment & {user:{userName:string,profile:string}}[],totalComments:number}>
}
