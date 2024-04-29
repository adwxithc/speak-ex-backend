import { IComment } from '../../../../domain/comment';
import { ICommentRepository } from '../../../../usecaseLayer/interface/repository/ICommentRepository';
import CommentModel from '../models/commentModel';
import { createComment, deleteComment,findById, updateComment,getComments } from './commentRepository/';


export class CommentRepository implements ICommentRepository {
    constructor(private commentModel: typeof CommentModel) {}

    async createComment(newComment: IComment): Promise<IComment | null> {
        return createComment({
            newComment,
            commentModel:this.commentModel
        });
    }

    async deleteComment({ commentId }: { commentId: string; }): Promise<boolean> {
        return await deleteComment({
            commentId,
            commentModel: this.commentModel,
        });
    }

    async findById(commentId: string): Promise<IComment | null> {
        return await findById({
            commentId,
            commentModel: this.commentModel,
        });
    }

    async updateComment({ postId, commentId, text }: { postId: string; commentId: string; text: string; }): Promise<IComment | null> {
        return await updateComment({
            postId,
            commentId,
            text,
            commentModel: this.commentModel,
        });
    }

    async getComments({ limit, page, postId }: { limit: number; page: number; postId: string; }): Promise<{comments:IComment[],totalComments:number}> {
        return await getComments({limit, page, postId ,commentModel:this.commentModel});
    }
    
}
