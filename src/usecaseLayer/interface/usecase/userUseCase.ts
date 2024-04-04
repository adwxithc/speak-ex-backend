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
    sendVerificationMail(email:string):Promise<{success:boolean}>;
}
