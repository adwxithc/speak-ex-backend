import { Req, Res } from '../infrastructureLayer/types/expressTypes';
import { IAccessRefreshToken } from '../usecaseLayer/interface/services/IJwt.types';
import { IPostUseCase } from '../usecaseLayer/interface/usecase/postUseCase';

export class PostController{
    constructor(private postUseCase:IPostUseCase){}

    async createPost(req:Req, res:Res){
        const {title,content } = req.body;
        const {id} = req.user as IAccessRefreshToken;
        
        const {file} = req;
        const post = await this.postUseCase.createPost({title,content,imageFile:file as Express.Multer.File,userId:id });
        res.json({
            success:true,
            message:'post created successfully',
            data:post
        });
    }

    async getUsersPosts (req:Req, res:Res){

        const {userName} =req.params;
        
        const posts = await this.postUseCase.getUsersPosts({userName});
        res.json({
            success:true,
            data:posts
        });
    }

    async getPost(req:Req, res:Res){
        const {postId} = req.params;
        const post = await this.postUseCase.getPost({postId});
        res.json({
            success:true,
            data:post
        });
    }

    
} 