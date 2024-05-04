import { Req, Res } from '../infrastructureLayer/types/expressTypes';
import {
    accessTokenOptions,
    refreshTokenOptions,
} from '../infrastructureLayer/utils/tokenOptions';
import { BadRequestError } from '../usecaseLayer/errors';
import { IAccessRefreshToken } from '../usecaseLayer/interface/services/IJwt.types';
import { ILanguageUseCase } from '../usecaseLayer/interface/usecase/languageUseCase';
import { IUserUseCase } from '../usecaseLayer/interface/usecase/userUseCase';


export class UserController {
    private userUseCase: IUserUseCase;
    private languageUseCase: ILanguageUseCase;

    constructor({userUseCase,languageUseCase}:{userUseCase: IUserUseCase;languageUseCase:ILanguageUseCase}) {
        this.userUseCase=userUseCase;
        this.languageUseCase=languageUseCase;
    }

    async registerUser(req: Req, res: Res) {
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

    async createUser(req: Req, res: Res) {
        const token = req.cookies?.verficationToken;
        if (!token) {
            throw new BadRequestError('No verification token found');
        }
        const { otp } = req.body;

        const result = await this.userUseCase.createUser(otp, token);

        if (result)
            res.clearCookie('verificationToken').status(200).json({
                success: true,
                data: result,
            });
    }

    async resendOtp(req: Req, res: Res) {
        const token = req.cookies?.verficationToken;
        const newToken = await this.userUseCase.resendOtp(token);

        res.cookie('verficationToken', newToken, {
            httpOnly: true,
            sameSite: 'strict',
            expires: new Date(Date.now() + 30 * 60 * 1000),
        });

        res.status(200).json({
            success: true,
            message: 'verification otp has been re send to the mail',
        });
    }

    async signin(req: Req, res: Res) {
        const { email, password } = req.body;

        const result = await this.userUseCase.signin({ email, password });
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
            data: result.user,
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

    async sendPasswordResetMail(req: Req, res: Res) {
        const { email } = req.body;
        const token = await this.userUseCase.sendPasswordResetMail(email);
        res.cookie('forgotPasswordToken', token, {
            httpOnly: true,
            sameSite: 'strict',
            expires: new Date(Date.now() + 30 * 60 * 1000),
        });

        res.status(200).json({
            success: true,
            message: 'verification otp has been send to the mail',
        });
    }

    async verifyPasswordReset(req: Req, res: Res) {
        const token = req.cookies?.forgotPasswordToken;
        const { otp } = req.body;
        const passwordResetToken = await this.userUseCase.verifyPasswordReset(
            otp,
            token
        );

        res.cookie('passwordResetToken', passwordResetToken, {
            httpOnly: true,
            sameSite: 'strict',
            expires: new Date(Date.now() + 30 * 60 * 1000),
        });

        res.status(200).json({
            success: true,
            message: 'your email has been verified please provide new password',
        });
    }

    async resetPassword(req: Req, res: Res) {
        const { password } = req.body;
        const token = req.cookies?.passwordResetToken;
        await this.userUseCase.createNewPassword(password, token);

        res.json({
            success: true,
            message: 'new password created please login',
        });
    }

    // controller for admin
    async listUsers(req: Req, res: Res) {
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

        const usersData = await this.userUseCase.listUsers({
            page: pageNumber,
            limit: limitNumber,
            key,
        });

        res.status(200).json({
            success: true,
            data: usersData,
        });
    }


    async renewAccess(req: Req, res: Res) {
        const { refreshToken } = req.cookies;
        const accessToken = await this.userUseCase.renewAccess(refreshToken);
        res.cookie('accessToken', accessToken, accessTokenOptions);

        res.json({
            success: true,
        });
    }
    async checkUserName(req: Req, res: Res) {
        const { userName } = req.body;

        const available = await this.userUseCase.checkUserName(userName);

        res.json({
            success: true,
            data: { available },
        });
    }

    async updateProfile(req: Req, res: Res) {
        const { id } = req.user as IAccessRefreshToken;
        const { file } = req;

        const url = await this.userUseCase.updateProfile({
            imageFile: file,
            userId: id,
        });
        res.json({
            success: true,
            data: url,
            message: 'profile updated successfully',
        });
    }

    async updateUser(req: Req, res: Res) {
        const { id } = req.user as IAccessRefreshToken;
        const {
            firstName,
            lastName,
            userName,
            password,
            focusLanguage,
            proficientLanguage,
        } = req.body;

        const user = await this.userUseCase.updateUser({
            id,
            firstName,
            lastName,
            userName,
            password,
            focusLanguage,
            proficientLanguage,
        });

        res.json({
            success:true,
            data:user
        });
    }

    async listLanguages(req: Req, res: Res){
        const languages= await this.languageUseCase.getAllLanguages();
        res.json({
            success:true,
            data:languages
        });
    }

    async searchUsers(req:Req, res:Res){

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

        const usersData = await this.userUseCase.searchUsers({
            page: pageNumber,
            limit: limitNumber,
            key,
        });

        res.status(200).json({
            success: true,
            data: usersData,
        });
    }

    async getUser(req:Req, res:Res){
        const {userName} = req.params;
        const user = await this.userUseCase.getUser(userName); 

        res.json({
            succes:true,
            data:user
        });
    }

    async follow(req:Req, res:Res){
        const{id} =  req.user || {};
        const {userId} = req.params;
        await this.userUseCase.follow({followedUserId:userId, followerId:id || ''});
        res.json({
            success:true
        });
    }

    async unfollow(req:Req, res:Res){
        const{id} =  req.user || {};
        const {userId} = req.params;
        await this.userUseCase.unfollow({followedUserId:userId, followerId:id || ''});
        res.json({
            success:true
        });
    }
  
}
