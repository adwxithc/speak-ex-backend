import IUnverifiedUser from '../../../domainLayer/unverifiedUser';

export interface IUnverifiedUserRepository {
    findUser(email: string): Promise<IUnverifiedUser | null>;
    upsert(newUser: IUnverifiedUser | {email:string,otp:number}): Promise<IUnverifiedUser>;
    createUserCollection(newUser: IUnverifiedUser): Promise<IUnverifiedUser>;
    findUserWithOTP(
        email: string,
        otpFromUser: string
    ): Promise<IUnverifiedUser | null>;
    findUserAndDelete(email: string): Promise<IUnverifiedUser | null | boolean>;
}
