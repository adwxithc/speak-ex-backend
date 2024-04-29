import { Req, Res } from '../infrastructureLayer/types/expressTypes';
import { BadRequestError } from '../usecaseLayer/errors';
import { IAccessRefreshToken } from '../usecaseLayer/interface/services/IJwt.types';
import { IPostUseCase } from '../usecaseLayer/interface/usecase/postUseCase';

export class PostController {
    constructor(private postUseCase: IPostUseCase) {}

    async createPost(req: Req, res: Res) {
        const { title, content } = req.body;
        const { id } = req.user as IAccessRefreshToken;

        const { file } = req;
        const post = await this.postUseCase.createPost({
            title,
            content,
            imageFile: file as Express.Multer.File,
            userId: id,
        });
        res.json({
            success: true,
            message: 'post created successfully',
            data: post,
        });
    }

    async getUsersPosts(req: Req, res: Res) {
        const { userName } = req.params;

        const posts = await this.postUseCase.getUsersPosts({ userName });
        res.json({
            success: true,
            data: posts,
        });
    }

    async getPost(req: Req, res: Res) {
        const { postId } = req.params;
        const post = await this.postUseCase.getPost({ postId });
        res.json({
            success: true,
            data: post,
        });
    }
    async upvote(req:Req, res:Res){
        const {postId} = req.params;
        const {id} = req.user as IAccessRefreshToken;
        const post= await this.postUseCase.upvote({postId,userId:id});
        res.json({
            success:true,
            data:post
        });
    }

    async downvote(req:Req, res:Res){
        const {postId} = req.params;
        const {id} = req.user as IAccessRefreshToken;
        const post= await this.postUseCase.downvote({postId,userId:id});
        res.json({
            success:true,
            data:post
        });
    }

    async addComment(req:Req, res:Res){
        const {postId} = req.params;
        const {id} = req.user as IAccessRefreshToken;
        const {text,parentId=null} = req.body;
        
        const comment  = await this.postUseCase.addComment({postId,userId:id,text,parentId});

        res.json({
            success:true,
            data:comment
        });
    }

    async deleteComment(req:Req, res:Res){
        const {postId,commentId} = req.params;
        const {id} = req.user as IAccessRefreshToken;
        
        await this.postUseCase.deleteComment({postId,commentId,userId:id});

        res.json({
            success:true,
            message:'commente deleted'
        });
    }

    async updateComment(req:Req, res:Res){
        const {postId,commentId} = req.params;
        const {text}  = req.body;
        const {id} = req.user as IAccessRefreshToken;
        
        const comment = await this.postUseCase.updateComment({postId,commentId,userId:id,text});

        res.json({
            success:true,
            message:'commete updated',
            data:comment
        });
    }

    async getComments(req:Req, res:Res){
        const {postId} = req.params;

        const { page = 1, limit = 5, key = '' } = req.query;

        const pageNumber = parseInt(page as string);
        const limitNumber = parseInt(limit as string);

        if (
            typeof pageNumber !== 'number' ||
            typeof limitNumber !== 'number' ||
            typeof key !== 'string'
        ) {
            throw new BadRequestError('invalid parameters');
        }

        const comments = await this.postUseCase.getComments({
            page: pageNumber,
            limit: limitNumber,
            postId
        });

        res.json({
            success:true,
            data:comments
        });
    }

}
 