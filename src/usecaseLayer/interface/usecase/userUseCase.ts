import IUser from '../../../domainLayer/user';


// type UserDetails = {
//     newUser:IUser
// };

export interface IUserUseCase {
    // saving user details temporary
    registerUser(newUser: IUser): Promise<string | void | never>;
}
