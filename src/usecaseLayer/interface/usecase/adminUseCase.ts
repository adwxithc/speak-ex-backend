import IAdmin from '../../../domain/admin';
import { IToken } from '../services/IJwt.types';



export interface IAdminUseCase {
   
    //signin admin
    signin({email,password}:{email:string,password:string}): Promise<{admin:IAdmin,token:IToken} | never>

}
