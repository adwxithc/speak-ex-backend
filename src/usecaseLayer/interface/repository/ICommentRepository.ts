import { IComment } from '../../../domain/comment';



export interface ICommentRepository {
    createComment(newComment:IComment): Promise<IComment | null>;
    deleteComment({commentId}:{commentId:string}):Promise<boolean>
    findById(commentId:string):Promise<IComment | null>
    updateComment({postId, commentId, text}:{postId:string, commentId:string, text:string}):Promise<IComment | null>
}
