import { Req, Res } from '../../infrastructureLayer/types/expressTypes';
import {
    accessTokenOptions,
    refreshTokenOptions,
} from '../../infrastructureLayer/utils/tokenOptions';
// import { BadRequestError } from '../usecaseLayer/errors';
import { IAdminUseCase } from '../../usecaseLayer/interface/usecase/adminUseCase';

export class AdminController {
    constructor(private adminUseCase: IAdminUseCase) {}

    async signin(req: Req, res: Res) {
        const { email, password } = req.body;

        const result = await this.adminUseCase.signin({ email, password });
        res.cookie(
            'accessToken',
            result?.token.accessToken,
            accessTokenOptions
        );
        res.cookie(
            'refreshToken',
            result.token.refreshToken,
            refreshTokenOptions
        );

        res.json({
            succes: true,
            data: result.admin,
            message: 'login successfully',
        });
    }

    async signout(req: Req, res: Res) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.json({
            success: true,
            message: 'successfully logout',
        });
    }


    async updateUser(req: Req, res: Res) {
        const { id } = req.params;
        const {blocked } = req.body;
        const userData = await this.adminUseCase.updateUser({
            id,
            blocked,
        });

        res.status(200).json({
            success: true,
            data: userData,
        });
    }

    async getDashboardNumerics(req:Req, res:Res){
        const result = await this.adminUseCase.getDashboardNumerics();
        res.json({
            succes:true,
            data:result
        });
    }
    async getMonthlySessionsProfitSummary(req:Req, res:Res){
        const result = await this.adminUseCase.getMonthlySessionsProfitSummary();
        res.json({
            succes:true,
            data:result
        });
    }

    async getPopularPurchasePlans(req:Req, res:Res){
        const result = await this.adminUseCase.getPopularPurchasePlans();
        res.json({
            succes:true,
            data:result
        });
    }

    async getPopularPost(req:Req, res:Res){
        const result = await this.adminUseCase.getPopularPost();
        res.json({
            succes:true,
            data:result
        });
    }

   

   
}
