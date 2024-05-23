import IUser from '../../../../domain/user';
// import { IUnverifiedUser } from '../../../domainLayer/unverifiedUser';

import { BadRequestError } from '../../../errors';
// import { Ilogger, Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUnverifiedUserRepository } from '../../../interface/repository/IUnverifiedUserRepository';
import { IUserRepository } from '../../../interface/repository/IUserRepository';
import { IcreateOTP } from '../../../interface/services/ICreateOtp';
import { IHashpassword } from '../../../interface/services/IHashPassword';
import { IJwt } from '../../../interface/services/IJwt.types';
import { ISendMail } from '../../../interface/services/ISendMail';

export const registerUser = async (
    unverifiedUserRepository: IUnverifiedUserRepository,
    userRepository: IUserRepository,
    sendMail: ISendMail,
    otpGenerator: IcreateOTP,
    jwtTokenGenerator: IJwt,
    bcrypt: IHashpassword,
    newUser: IUser,
    // logger:Ilogger
): Promise<string | void | never> => {



    const {
        firstName,
        lastName,
        userName,
        email,
        password,
    } = newUser;
    // check user exist
    const [emailExistOnUserRepo, useNameExistOnUserRepo] = await Promise.all([
        userRepository.findUserByEmail(email),
        userRepository.findUserByUserName(userName)
    ]);
 
    if (emailExistOnUserRepo) {
       
        throw new BadRequestError('user already exist with the same mail id');
        
    }
    if (useNameExistOnUserRepo) {
       
        throw new BadRequestError('user already exist with the same userName');
        
    }

    

    // generate otp
    const otp = otpGenerator.generateOTP();

    // send mail
    await sendMail.sendEmailVerification(userName, email, otp);

    const hashPassword = await bcrypt.createHash(password as string);

    const jwtToken = jwtTokenGenerator.createVerificationJWT({
        userName,
        email,
    });

    // store data in unverified user repo
    if (jwtToken)
        await unverifiedUserRepository.upsert({
            firstName,
            lastName,
            userName,
            email,
            password: hashPassword,
            otp,
        });

    return jwtToken;
    


   
};
