import { Req, Res } from '../infrastructureLayer/types/expressTypes';
import {
    accessTokenOptions,
    refreshTokenOptions,
} from '../infrastructureLayer/utils/tokenOptions';
// import { BadRequestError } from '../usecaseLayer/errors';
import { IAdminUseCase } from '../usecaseLayer/interface/usecase/adminUseCase';

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

    // async listUsers(req: Req, res: Res) {
    //     const { page = 1, limit = 3, key = '' } = req.query;

    //     const pageNumber = parseInt(page as string);
    //     const limitNumber = parseInt(limit as string);

    //     if (
    //         typeof pageNumber !== 'number' ||
    //         typeof limitNumber !== 'number' ||
    //         typeof key !== 'string'
    //     ) {
    //         throw new BadRequestError('invalid parameters');
    //     }

    //     const usersData = await this.userUseCase.listUsers({
    //         page: pageNumber,
    //         limit: limitNumber,
    //         key,
    //     });

    //     res.status(200).json({
    //         success: true,
    //         data: usersData,
    //     });
    // }

    // async updateUser(req:Req, res:Res){
    //     const {id} = req.params;
    //     const {email,firstName,lastName, blocked }=req.body;
    //     const userData= await this.userUseCase.updateUser({id,email,firstName,lastName,blocked});

    //     res.status(200).json({
    //         success:true,
    //         data:userData
    //     });
    // }
}
