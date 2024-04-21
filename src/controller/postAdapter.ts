import { Req, Res } from '../infrastructureLayer/types/expressTypes';
import { IAccessRefreshToken } from '../usecaseLayer/interface/services/IJwt.types';
import { IPostUseCase } from '../usecaseLayer/interface/usecase/postUseCase';

export class PostController{
    constructor(private postUseCase:IPostUseCase){}

    async createPost(req:Req, res:Res){
        const {title,description } = req.body;
        const {id} = req.user as IAccessRefreshToken;
        const {file} = req;
        const post = await this.postUseCase.createPost({title,description,imageFile:file as Express.Multer.File,userId:id });
        res.json({
            success:true,
            message:'post created successfully',
            data:post
        });
    }
}