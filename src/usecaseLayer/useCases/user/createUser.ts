
import { IUnverifiedUserRepository } from '../../interface/repository/IUnverifiedUserRepository';
import { IUserRepository } from '../../interface/repository/IUserRepository';
import { IJwt } from '../../interface/services/IJwt.types';
import { BadRequestError} from '../../errors';

export const createUser = async ({
    UserRepository,
    UnverifiedUserRepository,
    jwtToken,
    otpFromUser,
    token,
}: {
    UserRepository: IUserRepository;
    UnverifiedUserRepository: IUnverifiedUserRepository;
    jwtToken: IJwt;
    otpFromUser: string;
    token: string;
}) => {
   
    
    const decode = await jwtToken.verifyJwt(token);

    if(!decode){
        throw new BadRequestError('token has been expired, register again');
        
    }
    const email = decode.email;
    const checkUser = await UnverifiedUserRepository.findUserWithOTP(email,otpFromUser);
    if(!checkUser){
        throw new BadRequestError('OTP mismatch'); 
    }
    const checkUserExistInUserRepo = await UserRepository.findUserByEmail(email);
    if(checkUserExistInUserRepo){
        throw new BadRequestError('user already exists');
    }

    const {firstName,lastName,userName,password}= checkUser;

    const user={
        firstName,
        lastName,
        userName,
        email,
        password
    };

    const newUser = await UserRepository.createUser(user);
 
    newUser.password='';

    return newUser;

};
