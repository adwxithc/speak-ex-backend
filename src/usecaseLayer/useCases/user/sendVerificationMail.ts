import { BadRequestError } from '../../errors';
import { IUserRepository } from '../../interface/repository/IUserRepository';
import { IcreateOTP } from '../../interface/services/ICreateOtp';
import { ISendMail } from '../../interface/services/ISendMail';

export const sendVerificationMail = async ({
    email,
    sendMail,
    otpGenerator,
    userRepository
}: {
    email: string,
    sendMail: ISendMail,
    otpGenerator: IcreateOTP,
    userRepository: IUserRepository,
}) => {

    const user= await userRepository.findUserByEmail(email);
    if(!user){
        throw new BadRequestError('user does not exist');
    }

    const otp =  otpGenerator.generateOTP();

    const result = await sendMail.sendEmailVerification(user.userName, email, otp);

    return result;
};
