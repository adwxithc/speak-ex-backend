import IUser from '../../../domainLayer/user';
import { IToken } from '../services/IJwt.types';



export interface IUserUseCase {
    // saving user details temporary
    registerUser(newUser: IUser): Promise<string | void | never>;

    //create verified user
    createUser(otpFromUser:string,token:string): Promise<IUser| never | null>

    //resent verification mail
    resendOtp(token:string):Promise<string | void>

    //signin user
    signin({email,password}:{email:string,password:string}): Promise<{user:IUser,token:IToken} | never>

    //send verification mail
    sendPasswordResetMail(email:string):Promise<string>;

    //verify otp for Password Reset
    verifyPasswordReset(otpFromUser:string,token:string):Promise<string>

    //create new password for user
    createNewPassword(password:string,token:string): Promise<boolean>


}
