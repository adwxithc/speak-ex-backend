import IUser from '../../domain/user';
import { IUserUseCase } from '../interface/usecase/userUseCase';
import { IUserRepository } from '../interface/repository/IUserRepository';

import {
    registerUser,
    createUser,
    login,
    sendPasswordResetMail,
    verifyPasswordReset,
    createNewPassword,
    resendOtp,
    listUsers,
    updateUser,
    renewAccess,
    checkUserName,
    updateProfile,
    searchUsers,
    getUser
} from './user';
import { IHashpassword } from '../interface/services/IHashPassword';
import { IcreateOTP } from '../interface/services/ICreateOtp';
import { ISendMail } from '../interface/services/ISendMail';
import { IJwt, IToken } from '../interface/services/IJwt.types';
import { IUnverifiedUserRepository } from '../interface/repository/IUnverifiedUserRepository';
import { IUserOtpRepository } from '../interface/repository/IUserOtp';
import { IFileBucket } from '../interface/services/IFileBucket';
import { ILanguageRepository } from '../interface/repository/ILanguageRepository';
import { IValidateDbObjects } from '../interface/services/validateDbObjects';

export class UserUseCase implements IUserUseCase {
    private readonly userRepository: IUserRepository;
    private readonly bcrypt: IHashpassword;
    private readonly otpGenerator: IcreateOTP;
    private readonly sendMail: ISendMail;
    private readonly unverifiedUserRepository: IUnverifiedUserRepository;
    private readonly jwtToken: IJwt;
    private readonly userOtpRepository: IUserOtpRepository;
    private readonly fileBucket: IFileBucket;
    private readonly languageRepository: ILanguageRepository;
    private readonly validateDbObjects: IValidateDbObjects;

    constructor({
        userRepository,
        bcrypt,
        otpGenerator,
        sendMail,
        unverifiedUserRepository,
        jwtToken,
        userOtpRepository,
        fileBucket,
        languageRepository,
        validateDbObjects,
    }: {
        userRepository: IUserRepository;
        bcrypt: IHashpassword;
        otpGenerator: IcreateOTP;
        sendMail: ISendMail;
        unverifiedUserRepository: IUnverifiedUserRepository;
        jwtToken: IJwt;
        userOtpRepository: IUserOtpRepository;
        fileBucket: IFileBucket;
        languageRepository: ILanguageRepository;
        validateDbObjects: IValidateDbObjects;
    }) {
        this.userRepository = userRepository;
        this.bcrypt = bcrypt;
        this.otpGenerator = otpGenerator;
        this.sendMail = sendMail;
        this.unverifiedUserRepository = unverifiedUserRepository;
        this.jwtToken = jwtToken;
        this.userOtpRepository = userOtpRepository;
        this.fileBucket = fileBucket;
        this.languageRepository = languageRepository;
        this.validateDbObjects = validateDbObjects;
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
            token,
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
            fileBucket: this.fileBucket,
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
            UserOtpRepository: this.userOtpRepository,
            jwtToken: this.jwtToken,
            otpFromUser,
            token,
        });
    }

    async createNewPassword(password: string, token: string): Promise<boolean> {
        return await createNewPassword({
            UserRepository: this.userRepository,
            jwtToken: this.jwtToken,
            token,
            password,
            bcrypt: this.bcrypt,
        });
    }

    async listUsers({
        page,
        key,
        limit,
    }: {
        page: number;
        key: string;
        limit: number;
    }): Promise<{
        users: Omit<IUser, 'password'>[];
        totalUsers: number;
        lastPage: number;
    }> {
        const usersData = await listUsers({
            UserRepository: this.userRepository,
            fileBucket: this.fileBucket,
            page,
            key,
            limit,
        });
        return usersData;
    }

    async searchUsers({
        page,
        key,
        limit,
    }: {
        page: number;
        key: string;
        limit: number;
    }): Promise<{
        users: Pick<IUser, 'userName' | 'profile'>[];
        totalUsers: number;
        lastPage: number;
    }> {

        return await searchUsers({
            UserRepository: this.userRepository,
            fileBucket: this.fileBucket,
            page,
            key,
            limit,
        });

    }

    async updateUser({
        id,
        firstName,
        lastName,
        userName,
        password,
        focusLanguage,
        proficientLanguage,
    }: {
        id: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
        userName?: string | undefined;
        password?: string | undefined;
        focusLanguage?: string | undefined;
        proficientLanguage?: string[] | undefined;
    }): Promise<Omit<IUser, 'password'> | null> {
        return await updateUser({
            id,
            firstName,
            lastName,
            userName,
            password,
            focusLanguage,
            proficientLanguage,
            userRepository: this.userRepository,
            languageRepository: this.languageRepository,
            fileBucket: this.fileBucket,
            validateDbObjects: this.validateDbObjects,
        });
    }

    async renewAccess(token: string): Promise<string | undefined> {
        return await renewAccess({
            token,
            jwtToken: this.jwtToken,
            UserRepository: this.userRepository,
        });
    }
    async checkUserName(userName: string): Promise<boolean> {
        return await checkUserName({
            userName,
            UserRepository: this.userRepository,
        });
    }

    async updateProfile({
        imageFile,
        userId,
    }: {
        imageFile: Express.Multer.File | undefined;
        userId: string;
    }): Promise<string> {
        return await updateProfile({
            imageFile,
            userId,
            fileBucket: this.fileBucket,
            userRepository: this.userRepository,
        });
    }

    async getUser(userName: string): Promise<Omit<IUser, 'password'>> {
        return await getUser({
            userName,
            fileBucket: this.fileBucket,
            userRepository: this.userRepository,
        });
    }
    
}
