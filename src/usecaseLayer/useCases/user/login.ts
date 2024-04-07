import IUser from '../../../domain/user';
import { BadRequestError } from '../../errors';
import { IUserRepository } from '../../interface/repository/IUserRepository';
import { IHashpassword } from '../../interface/services/IHashPassword';
import { IJwt, IToken } from '../../interface/services/IJwt.types';

export const login = async ({
    userRepository,
    bcrypt,
    jwtToken,
    email,
    password,
}: {
    userRepository: IUserRepository;
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

    const token =  jwtToken.createAccessAndRefreshToken(user.id as string);
    
    user.password='';

    return {user, token};
};
