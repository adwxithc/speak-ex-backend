import { Req, Res, Next } from '../infrastructureLayer/types/expressTypes';
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
}
