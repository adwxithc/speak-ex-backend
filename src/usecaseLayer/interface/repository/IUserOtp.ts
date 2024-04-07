import IUserOtp from '../../../domainLayer/userOtp';

export interface IUserOtpRepository {
    upsert(newUser: IUserOtp): Promise<IUserOtp>;
    findUserWithOTP(
        email: string,
        otpFromUser: string
    ): Promise<IUserOtp | null>;
}
