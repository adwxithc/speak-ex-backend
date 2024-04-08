import { Req, Res } from '../infrastructureLayer/types/expressTypes';
import { accessTokenOptions, refreshTokenOptions } from '../infrastructureLayer/utils/tokenOptions';
import { IAdminUseCase } from '../usecaseLayer/interface/usecase/adminUseCase';


export class AdminController {
    constructor(private adminUseCase: IAdminUseCase) {}


    async signin(req:Req,res:Res){
        const {email, password} = req.body;

        const result = await this.adminUseCase.signin({email,password});
        res.cookie('accessToken',result?.token.accessToken,accessTokenOptions);
        res.cookie('refreshToken',result.token.refreshToken,refreshTokenOptions);

        res.json({
            succes:true,
            data:result.admin,
            message:'login successfully'
        });
    }
}