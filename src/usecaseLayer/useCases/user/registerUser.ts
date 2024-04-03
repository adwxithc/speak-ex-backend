import IUser from '../../../domainLayer/user';
// import { IUnverifiedUser } from '../../../domainLayer/unverifiedUser';
import { Next } from '../../../infrastructureLayer/types/expressTypes';
import { BadRequestError } from '../../errors';
// import { Ilogger, Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IUnverifiedUserRepository } from '../../interface/repository/IUnverifiedUserRepository';
import { IUserRepository } from '../../interface/repository/IUserRepository';
import { IcreateOTP } from '../../interface/services/ICreateOtp';
import { IHashpassword } from '../../interface/services/IHashPassword';
import { IJwt } from '../../interface/services/IJwt.types';
import { ISendMail } from '../../interface/services/ISendMail';

export const registerUser = async (
    unverifiedUserRepository: IUnverifiedUserRepository,
    userRepository: IUserRepository,
    sendMail: ISendMail,
    otpGenerator: IcreateOTP,
    jwtTokenGenerator: IJwt,
    bcrypt: IHashpassword,
    newUser: IUser,
    next: Next
    // logger:Ilogger
): Promise<string | void | never> => {
    const {
        firstName,
        lastName,
        username,
        email,
        password,
        focusLanguage,
        proficientLanguage,
    } = newUser;
    // check user exist

    const isUserExistOnUserRepo = await userRepository.findUserByEmail(email);

    if (isUserExistOnUserRepo) {
        return next(
            new BadRequestError('user already exist with the same mail id')
        );
    }

    // generate otp
    const otp = await otpGenerator.generateOTP();

    // send mail
    await sendMail.sendEmailVerification(username, email, otp);

    const hashPassword = await bcrypt.createHash(password as string);

    const jwtToken = await jwtTokenGenerator.createVerificationJWT({
        username,
        email,
    });

    // store data in unverified user repo
    if (jwtToken)
        await unverifiedUserRepository.upsert({
            firstName,
            lastName,
            username,
            email,
            password: hashPassword,
            focusLanguage,
            proficientLanguage,
            otp,
        });

    return jwtToken;
};
