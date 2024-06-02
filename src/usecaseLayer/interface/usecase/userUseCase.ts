import ILanguage from '../../../domain/language';
import INotification from '../../../domain/notification';
import { IReport } from '../../../domain/report';
import IUser from '../../../domain/user';
import IWallet from '../../../domain/wallet';
import { IToken } from '../services/IJwt.types';

export interface INotificationDetails extends INotification {
    actionCreatorInfo: {
        id: string;
        firstName: string;
        lastName: string;
        userName: string;
        profile: string;
    };
}

export interface IUserDetails extends Omit<IUser, 'password'> {
    proficientLanguageInfo: ILanguage[];
    focusLanguageInfo: ILanguage;
    wallet: IWallet;
    session: {
        helpingSessions: number;
        learningSessions: number;
        rating: number;
        avgHelpingSessionsPerMonth: number;
        avgLearningSessionsPerMonth: number;
    };
    social: {
        followers: number;
        following: number;
        posts: number;
        averageLikes: number;
    };
    reports: (IReport & {
        reporterDetails: {
            firstName: string;
            lastName: string;
            userName: string;
            profile: string;
        };
    })[];
}

export interface IUserUseCase {
    // saving user details temporary
    registerUser(newUser: IUser): Promise<string | void | never>;

    //create verified user
    createUser(
        otpFromUser: string,
        token: string
    ): Promise<IUser | never | null>;

    //resent verification mail
    resendOtp(token: string): Promise<string | void>;

    //signin user
    signin({
        email,
        password,
    }: {
        email: string;
        password: string;
    }): Promise<{ user: IUser; token: IToken } | never>;

    //send verification mail
    sendPasswordResetMail(email: string): Promise<string>;

    //verify otp for Password Reset
    verifyPasswordReset(otpFromUser: string, token: string): Promise<string>;

    //create new password for user
    createNewPassword(password: string, token: string): Promise<boolean>;

    //get list of users
    listUsers({
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
    }>;

    //searchUsers list of users
    searchUsers({
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
    }>;

    updateUser({
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
    }): Promise<Omit<IUser, 'password'> | null>;

    //renewAccess token
    renewAccess(token: string): Promise<string>;

    checkUserName(userName: string): Promise<boolean>;

    updateProfile({
        imageFile,
        userId,
    }: {
        imageFile: Express.Multer.File | undefined;
        userId: string;
    }): Promise<string>;

    getUser(userName: string): Promise<Omit<IUser, 'password'>>;
    getUserById(userId: string): Promise<Omit<IUser, 'password'>>;
    getUserDetails(userId: string): Promise<IUserDetails>;

    follow({
        followerId,
        followedUserId,
    }: {
        followerId: string;
        followedUserId: string;
    }): Promise<void>;
    unfollow({
        followerId,
        followedUserId,
    }: {
        followerId: string;
        followedUserId: string;
    }): Promise<void>;
    getFollowers({
        userName,
        page,
        limit,
    }: {
        userName: string;
        page: number;
        limit: number;
    }): Promise<{
        users: {
            userName: string;
            profile: string;
            firstName: string;
            lastName: string;
            focusLanguage?: string;
        }[];
        totalUsers: number;
    }>;

    getFollowings({
        userName,
        page,
        limit,
    }: {
        userName: string;
        page: number;
        limit: number;
    }): Promise<{
        users: {
            userName: string;
            profile: string;
            firstName: string;
            lastName: string;
            focusLanguage?: string;
        }[];
        totalUsers: number;
    }>;
    getWallet({ userId }: { userId: string }): Promise<IWallet | null>;

    getNotifications({
        userId,
        page,
        limit,
    }: {
        userId: string;
        page: number;
        limit: number;
    }): Promise<{
        notifications: INotificationDetails[];
        totalNotifications: number;
        lastPage: number;
        currentPage:number
    }>;

    setNotificationReaded({
        userId,
        notificationIds,
    }: {
        userId: string;
        notificationIds: string[];
    }): Promise<void>;

    getSingleNotification({userId,notificationId}:{userId:string,notificationId:string}):Promise<INotificationDetails>
}
