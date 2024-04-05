import IUser from '../../../domainLayer/user';
import { IToken } from '../services/IJwt.types';


// type UserDetails = {
//     newUser:IUser
// };

export interface IUserUseCase {
    // saving user details temporary
    registerUser(newUser: IUser): Promise<string | void | never>;

    //create verified user
    createUser(otpFromUser:string,token:string): Promise<IUser| never | null>

    //signin user
    signin({email,password}:{email:string,password:string}): Promise<{user:IUser,token:IToken} | never>

    //send verification mail
    sendPasswordResetMail(email:string):Promise<string>;

    //verify otp for Password Reset
    verifyPasswordReset(otpFromUser:string,token:string):Promise<string>

    //create new password for user
    createNewPassword(password:string,token:string): Promise<boolean>

    //verify email by entering otp sent to particular email
    // verifyEmail(otpFromUser:string,token:string): Promise<string | never>
}
