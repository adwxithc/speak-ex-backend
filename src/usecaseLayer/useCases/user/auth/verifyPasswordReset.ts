import { BadRequestError } from '../../../errors';
import { IUserOtpRepository } from '../../../interface/repository/IUserOtp';
import { IJwt } from '../../../interface/services/IJwt.types';

export const verifyPasswordReset = async ({
    UserOtpRepository,
    jwtToken,
    otpFromUser,
    token
}: {
    UserOtpRepository: IUserOtpRepository;
    jwtToken:IJwt,
    otpFromUser:string,
    token:string
}) => {
    const decode = await jwtToken.verifyJwt(token);

    if(!decode){
        throw new BadRequestError('token has been expired, try again');
        
    }

    const {email,userName} = decode;
    const checkUser = await UserOtpRepository.findUserWithOTP(email,otpFromUser);

    if(!checkUser){
        throw new BadRequestError('OTP mismatch');
    }

    const resetToken = jwtToken.createPasswordResetJWT({email,userName});

    return resetToken;
};
