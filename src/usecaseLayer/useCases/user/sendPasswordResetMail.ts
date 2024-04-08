import { BadRequestError } from '../../errors';
import { IUserOtpRepository } from '../../interface/repository/IUserOtp';
import { IUserRepository } from '../../interface/repository/IUserRepository';
import { IcreateOTP } from '../../interface/services/ICreateOtp';
import { IJwt } from '../../interface/services/IJwt.types';
import { ISendMail } from '../../interface/services/ISendMail';

export const sendPasswordResetMail = async ({
    email,
    sendMail,
    otpGenerator,
    userRepository,
    jwtTokenGenerator,
    userOtpRepository
}: {
    email: string,
    sendMail: ISendMail,
    otpGenerator: IcreateOTP,
    userRepository: IUserRepository,
    jwtTokenGenerator:IJwt
    userOtpRepository:IUserOtpRepository
}) => {

    const user= await userRepository.findUserByEmail(email);
    if(!user){
        throw new BadRequestError('user account  does not exist please signup');

    }

    const { userName}=user;

    const otp =  otpGenerator.generateOTP();

    await sendMail.sendEmailVerification(userName, email, otp);

    const jwtToken = jwtTokenGenerator.createVerificationJWT({
        userName,
        email,
    });

    await userOtpRepository.upsert({
        email,
        otp
    });
    

    return jwtToken;
};
