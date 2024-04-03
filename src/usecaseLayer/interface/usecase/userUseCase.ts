import IUser from '../../../domainLayer/user';
import { Next } from '../../../infrastructureLayer/types/expressTypes';


// type UserDetails = {
//     newUser:IUser
// };

export interface IUserUseCase {
  // saving user details temporary
  registerUser(
    newUser:IUser,
    next:Next
  ): Promise<string | void | never>;

}