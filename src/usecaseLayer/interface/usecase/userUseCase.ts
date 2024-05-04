import IUser from '../../../domain/user';
import { IToken } from '../services/IJwt.types';

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
        userName?:string,
        password?:string,
        focusLanguage?:string,
        proficientLanguage?:string[],
        
    }): Promise<Omit<IUser, 'password'> | null>;

    //renewAccess token
    renewAccess(token: string): Promise<string | undefined>;

    checkUserName(userName:string): Promise<boolean>;

    updateProfile({imageFile,userId}:{imageFile:Express.Multer.File | undefined,userId:string}):Promise<string>

    getUser(userName:string):Promise<Omit<IUser, 'password'>>

    follow({followerId,followedUserId}:{followerId:string,followedUserId:string}):Promise<void>
    unfollow({followerId,followedUserId}:{followerId:string,followedUserId:string}):Promise<void>
}
