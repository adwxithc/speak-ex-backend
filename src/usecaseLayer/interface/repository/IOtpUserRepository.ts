import { IOtpUser } from "../../../domainLayer/otpuser";

export interface IOtpRepository {
    findUser(email: string): Promise<IOtpUser | null>;
    createOtpUserCollection(newUser: IOtpUser): Promise<IOtpUser>;
    findUserWithOTP(email: string, otpFromUser: string): Promise<IOtpUser | null>
    findUserAndDelete(email: string): Promise<IOtpUser | null | boolean>
}