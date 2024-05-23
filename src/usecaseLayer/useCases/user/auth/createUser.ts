
import { IUnverifiedUserRepository } from '../../../interface/repository/IUnverifiedUserRepository';
import { IUserRepository } from '../../../interface/repository/IUserRepository';
import { IJwt } from '../../../interface/services/IJwt.types';
import { BadRequestError} from '../../../errors';
import { IWalletRepository } from '../../../interface/repository/IWalletRepository';
import { IGenerateUniQueString } from '../../../interface/services/IGenerateUniQueString';

export const createUser = async ({
    UserRepository,
    UnverifiedUserRepository,
    walletRepository,
    generateUniQueString,
    jwtToken,
    otpFromUser,
    token,
}: {
    UserRepository: IUserRepository;
    UnverifiedUserRepository: IUnverifiedUserRepository;
    walletRepository:IWalletRepository;
    generateUniQueString:IGenerateUniQueString
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

    const checkUserNameExistInUserRepo = await UserRepository.findUserByUserName(checkUser.userName);
    if(checkUserNameExistInUserRepo){
        throw new BadRequestError('a user already exists same userName');
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

    const userId:string= newUser?.id || '';
    const transactionId = generateUniQueString.getString();
    await walletRepository.creditToWallet({amount:100,currencyType:'silver',userId,description:'Congratulations on your signup! You have received 100 silver coins as a welcome gift to kickstart your journey with us.',transactionId});
  
    
 
    newUser.password='';

    return newUser;

};
