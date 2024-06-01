import IUser from '../../domain/user';
import {
    IUserUseCase,
} from '../interface/usecase/userUseCase';
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
    getUser,
    follow,
    unfollow,
    getFollowers,
    getFollowings,
    getUserById,
    getWallet,
    getUserDetails,
    getNotifications,
    setNotificationReaded,
    getSingleNotification,
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
import { IWalletRepository } from '../interface/repository/IWalletRepository';
import { IGenerateUniQueString } from '../interface/services/IGenerateUniQueString';
import { IPostRepository } from '../interface/repository/IPostRepository';
import { IReportRepository } from '../interface/repository/IReportRepository';
import { ISessionRepository } from '../interface/repository/ISessionRepository';
import { INotificationRepository } from '../interface/repository/INotification';

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
    private readonly walletRepository: IWalletRepository;
    private readonly postRepository: IPostRepository;
    private readonly reportRepository: IReportRepository;
    private readonly sessionRepository: ISessionRepository;
    private readonly generateUniQueString: IGenerateUniQueString;
    private readonly notificationRepository: INotificationRepository;

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
        walletRepository,
        postRepository,
        sessionRepository,
        reportRepository,
        generateUniQueString,
        notificationRepository,
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
        walletRepository: IWalletRepository;
        sessionRepository: ISessionRepository;
        postRepository: IPostRepository;
        reportRepository: IReportRepository;
        generateUniQueString: IGenerateUniQueString;
        notificationRepository: INotificationRepository;
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
        this.walletRepository = walletRepository;
        this.generateUniQueString = generateUniQueString;
        this.postRepository = postRepository;
        this.reportRepository = reportRepository;
        this.sessionRepository = sessionRepository;
        this.notificationRepository = notificationRepository;
    }

    //register user
    async registerUser(newUser: IUser) {
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
    async createUser(otpFromUser: string, token: string) {
        const result = await createUser({
            UserRepository: this.userRepository,
            UnverifiedUserRepository: this.unverifiedUserRepository,
            jwtToken: this.jwtToken,
            otpFromUser: otpFromUser,
            token: token,
            walletRepository: this.walletRepository,
            generateUniQueString: this.generateUniQueString,
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
        firstName?: string;
        lastName?: string;
        userName?: string;
        password?: string;
        focusLanguage?: string;
        proficientLanguage?: string[];
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

    async renewAccess(token: string) {
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

    async getUserById(userId: string) {
        return await getUserById({
            userId,
            userRepository: this.userRepository,
            fileBucket: this.fileBucket,
        });
    }

    async follow({
        followerId,
        followedUserId,
    }: {
        followerId: string;
        followedUserId: string;
    }): Promise<void> {
        return await follow({
            followerId,
            followedUserId,
            userRepository: this.userRepository,
        });
    }

    async unfollow({
        followerId,
        followedUserId,
    }: {
        followerId: string;
        followedUserId: string;
    }): Promise<void> {
        return await unfollow({
            followerId,
            followedUserId,
            userRepository: this.userRepository,
        });
    }

    async getFollowers({
        userName,
        page,
        limit,
    }: {
        userName: string;
        page: number;
        limit: number;
    }) {
        return await getFollowers({
            userName,
            page,
            limit,
            userRepository: this.userRepository,
            fileBucket: this.fileBucket,
        });
    }

    async getFollowings({
        userName,
        page,
        limit,
    }: {
        userName: string;
        page: number;
        limit: number;
    }) {
        return await getFollowings({
            userName,
            page,
            limit,
            userRepository: this.userRepository,
            fileBucket: this.fileBucket,
        });
    }

    async getWallet({ userId }: { userId: string }) {
        return await getWallet({
            userId,
            walletRepository: this.walletRepository,
        });
    }

    async getUserDetails(userId: string) {
        return await getUserDetails({
            userId,
            userRepository: this.userRepository,
            fileBucket: this.fileBucket,
            postRepository: this.postRepository,
            reportRepository: this.reportRepository,
            sessionRepository: this.sessionRepository,
        });
    }
    async getNotifications({
        userId,
        page,
        limit,
    }: {
        userId: string;
        page: number;
        limit: number;
    }) {
        return await getNotifications({
            userId,
            page,
            limit,
            notificationRepository: this.notificationRepository,
            fileBucket: this.fileBucket,
        });
    }

    async setNotificationReaded({
        userId,
        notificationIds,
    }: {
        userId: string;
        notificationIds: string[];
    }) {
        return await setNotificationReaded({
            userId,
            notificationIds,
            notificationRepository: this.notificationRepository,
        });
    }

    async getSingleNotification({
        userId,
        notificationId,
    }: {
        userId: string;
        notificationId: string;
    }) {
        return await getSingleNotification({
            userId,
            notificationId,
            notificationRepository: this.notificationRepository,
            fileBucket: this.fileBucket,
        });
    }
}
