import { Req, Res, Next } from '../infrastructureLayer/types/expressTypes';
import { accessTokenOptions, refreshTokenOptions } from '../infrastructureLayer/utils/tokenOptions';
import { BadRequestError } from '../usecaseLayer/errors';
import { UserUseCase } from '../usecaseLayer/useCases/userUseCase';

export class UserController {
    constructor(private userUseCase: UserUseCase) {}

    async registerUser(req: Req, res: Res, next: Next) {


        const token = await this.userUseCase.registerUser(req.body);

        res.cookie('verficationToken', token, {
            httpOnly: true,
            sameSite: 'strict',
            expires: new Date(Date.now() + 30 * 60 * 1000),
        });

        res.status(200).json({
            success: true,
            message: 'verification otp has been send to the mail',
        });
        
    }

    async createUser(req: Req, res:Res, next:Next){
        const token = req.cookies?.verficationToken;
        if(!token){
            throw new BadRequestError('No verification token found');

        }
        const {otp}= req.body;

        const result = await this.userUseCase.createUser(otp,token);

        if(result) res.clearCookie('verificationToken').status(200).send(result);
    }

    async signin(req:Req,res:Res, next:Next){
        const {email, password} = req.body;

        const result = await this.userUseCase.signin({email,password});
        res.cookie('accessToken',result?.token.accessToken,accessTokenOptions);
        res.cookie('refreshToken',result.token.refreshToken,refreshTokenOptions);

        res.json(result.user);
    }

    
}
