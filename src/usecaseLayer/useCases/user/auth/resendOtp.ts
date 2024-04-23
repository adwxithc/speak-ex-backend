
import { BadRequestError } from '../../../errors';
import { IUnverifiedUserRepository } from '../../../interface/repository/IUnverifiedUserRepository';
import { IcreateOTP } from '../../../interface/services/ICreateOtp';
import { IJwt } from '../../../interface/services/IJwt.types';
import { ISendMail } from '../../../interface/services/ISendMail';

export const resendOtp = async ({
    unverifiedUserRepository,
    sendMail,
    otpGenerator,
    jwtTokenGenerator,
    token
}:{
    unverifiedUserRepository: IUnverifiedUserRepository,
    sendMail: ISendMail,
    otpGenerator: IcreateOTP,
    jwtTokenGenerator: IJwt,
    token:string
    // logger:Ilogger
}
): Promise<string | void | never> => {

    const decode= await jwtTokenGenerator.verifyJwt(token);

    if(!decode) throw new BadRequestError('invalid token');

    const {email} = decode;
    // check user exist

    const userOtp= await unverifiedUserRepository.findUser(email);

    if(!userOtp){
        throw new BadRequestError('invalid request or user request expired please signup again');
    }

    const currentTime = Date.now();
    const timeDifference = userOtp.updatedAt && currentTime - userOtp.updatedAt.getTime();
    const differenceInMinutes = timeDifference as number / (1000 * 60);

    if(differenceInMinutes<1){
        throw new BadRequestError('please request for otp resend after one minute');
    }

    // generate otp
    const otp = otpGenerator.generateOTP();

    // send mail
    await sendMail.sendEmailVerification(userOtp.userName, email, otp);

    const jwtToken =  jwtTokenGenerator.createVerificationJWT({
        userName:userOtp.userName,
        email,
    });

    // store data in unverified user repo
    if (jwtToken)
        await unverifiedUserRepository.upsert({
            email,
            otp,
        });

    return jwtToken;
     
};
