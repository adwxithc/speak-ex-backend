import IUser from '../../../../domain/user';
import { BadRequestError } from '../../../errors';
import { IUserRepository } from '../../../interface/repository/IUserRepository';
import { IFileBucket } from '../../../interface/services/IFileBucket';
import { IHashpassword } from '../../../interface/services/IHashPassword';
import { IAccessRefreshToken, IJwt, IToken } from '../../../interface/services/IJwt.types';

export const login = async ({
    userRepository,
    fileBucket,
    bcrypt,
    jwtToken,
    email,
    password,
}: {
    userRepository: IUserRepository;
    fileBucket:IFileBucket;
    bcrypt: IHashpassword;
    jwtToken: IJwt;
    email: string;
    password: string;
}):Promise<{user:IUser,token:IToken} | never> => {

    const user = await userRepository.findUserByEmail(email);
    if(!user) throw new BadRequestError('invalid email or password');

    if(user.blocked) throw new BadRequestError('access has been denied');
    const hashPassword = user.password;
    const passwordMatch =  await bcrypt.comparePassword(password,hashPassword);

    if(!passwordMatch) throw new BadRequestError('invalid email or password');

    if(user.profile)
        user.profile=fileBucket.getFileAccessURL(user.profile);

    const data ={
        id:user.id,
        role:'user'
    };
    const token =  jwtToken.createAccessAndRefreshToken(data as IAccessRefreshToken);


    return {user, token};
};
