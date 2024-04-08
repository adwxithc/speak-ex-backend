import IUser from '../../domain/user';
import { IUserUseCase } from '../interface/usecase/userUseCase';
import { IUserRepository } from '../interface/repository/IUserRepository';

import { registerUser, createUser, login, sendPasswordResetMail, verifyPasswordReset, createNewPassword, resendOtp } from './user';
import { IHashpassword } from '../interface/services/IHashPassword';
import { IcreateOTP } from '../interface/services/ICreateOtp';
import { ISendMail } from '../interface/services/ISendMail';
import { IJwt, IToken } from '../interface/services/IJwt.types';
import { IUnverifiedUserRepository } from '../interface/repository/IUnverifiedUserRepository';
import { IUserOtpRepository } from '../interface/repository/IUserOtp';

export class UserUseCase implements IUserUseCase {
    private readonly userRepository: IUserRepository;
    private readonly bcrypt: IHashpassword;
    private readonly otpGenerator: IcreateOTP;
    private readonly sendMail: ISendMail;
    private readonly unverifiedUserRepository: IUnverifiedUserRepository;
    private readonly jwtToken: IJwt;
    private readonly userOtpRepository: IUserOtpRepository;

    constructor(
        userRepository: IUserRepository,
        bcrypt: IHashpassword,
        otpGenerator: IcreateOTP,
        sendMail: ISendMail,
        unverifiedUserRepository: IUnverifiedUserRepository,
        jwtToken: IJwt,
        userOtpRepository: IUserOtpRepository
    ) {
        this.userRepository = userRepository;
        this.bcrypt = bcrypt;
        this.otpGenerator = otpGenerator;
        this.sendMail = sendMail;
        this.unverifiedUserRepository = unverifiedUserRepository;
        this.jwtToken = jwtToken;
        this.userOtpRepository = userOtpRepository;
    }

    //register user
    async registerUser(newUser: IUser): Promise<string | void | never> {
        const result = await registerUser(
            this.unverifiedUserRepository,
            this.userRepository,
            this.sendMail,
            this.otpGenerator,
            this.jwtToken,
            this.bcrypt,
            newUser
        );
        return result;
    }

    //create verified user
    async createUser(
        otpFromUser: string,
        token: string
    ): Promise<IUser | null> {
       
        const result = await createUser({
            UserRepository: this.userRepository,
            UnverifiedUserRepository: this.unverifiedUserRepository,
            jwtToken: this.jwtToken,
            otpFromUser: otpFromUser,
            token: token,
        });
        
        return result;
    }

    //resend verification otp
    async resendOtp(token: string): Promise<string | void> {
        return await resendOtp({
            unverifiedUserRepository: this.unverifiedUserRepository,
            sendMail: this.sendMail,
            otpGenerator: this.otpGenerator,
            jwtTokenGenerator: this.jwtToken,
            token 
        });
    }



    //signin
    async signin({
        email,
        password,
    }: {
        email: string;
        password: string;
    }): Promise<{ user: IUser; token: IToken }> {
        return await login({
            bcrypt: this.bcrypt,
            jwtToken: this.jwtToken,
            userRepository: this.userRepository,
            email: email,
            password: password,
        });
    }

    async sendPasswordResetMail(email: string): Promise<string> {
        return await sendPasswordResetMail({
            email,
            otpGenerator: this.otpGenerator,
            sendMail: this.sendMail,
            userRepository: this.userRepository,
            jwtTokenGenerator: this.jwtToken,
            userOtpRepository: this.userOtpRepository,
        });
    }

    async verifyPasswordReset(
        otpFromUser: string,
        token: string
    ): Promise<string> {
        return verifyPasswordReset({
            UserOtpRepository:this.userOtpRepository,
            jwtToken:this.jwtToken,
            otpFromUser,
            token,
        });
    }

    async createNewPassword(password: string, token: string): Promise< boolean> {
        return await createNewPassword({
            UserRepository:this.userRepository,
            jwtToken:this.jwtToken,
            token,
            password,
            bcrypt:this.bcrypt
        });
    }
}
