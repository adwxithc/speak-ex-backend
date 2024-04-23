
import { BadRequestError } from '../../../errors';
import { IUserRepository } from '../../../interface/repository/IUserRepository';
import { IHashpassword } from '../../../interface/services/IHashPassword';
import { IJwt } from '../../../interface/services/IJwt.types';

export const createNewPassword = async ({
    UserRepository,
    jwtToken,
    token,
    password,
    bcrypt


}: {
    UserRepository: IUserRepository;
    jwtToken: IJwt;
    token:string;
    password:string;
    bcrypt:IHashpassword
    
}) => {

    const decode = await jwtToken.verifyPasswordResetJwt(token);

    if(!decode){
        throw new BadRequestError('token has been expired, try again');
    }
    const {email}= decode;

    const user= await UserRepository.findUserByEmail(email);

    if(!user){
        throw new BadRequestError('user does not exist please signup');
    }

    const{id} = user;

    const hashPassword = await bcrypt.createHash(password as string);


    return await UserRepository.changePassword(hashPassword,id as string);
 
};
