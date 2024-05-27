import IAdmin from '../../../domain/admin';
import IUser from '../../../domain/user';
import { IToken } from '../services/IJwt.types';



export interface IAdminUseCase {
   
    //signin admin
    signin({email,password}:{email:string,password:string}): Promise<{admin:IAdmin,token:IToken} | never>
    updateUser({
        id,
        blocked,
    }: {
        id: string;
        blocked?: boolean;
        
    }): Promise<Omit<IUser, 'password'> | null>;



}
