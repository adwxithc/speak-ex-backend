import IUser from '../../domainLayer/user';
import { IUserUseCase } from '../interface/usecase/userUseCase';
import { IUserRepository } from '../interface/repository/IUserRepository';

import { registerUser } from './user';
import { IHashpassword } from '../interface/services/IHashPassword';
import { IcreateOTP } from '../interface/services/ICreateOtp';
import { ISendMail } from '../interface/services/ISendMail';
import { IJwt } from '../interface/services/IJwt.types';
import { IUnverifiedUserRepository } from '../interface/repository/IUnverifiedUserRepository';
import { Next } from '../../infrastructureLayer/types/expressTypes';

export class UserUseCase implements IUserUseCase {
    private readonly userRepository: IUserRepository;
    private readonly bcrypt: IHashpassword;
    private readonly otpGenerator: IcreateOTP;
    private readonly sendMail: ISendMail;
    private readonly unverifiedUserRepository: IUnverifiedUserRepository;
    private readonly jwtToken: IJwt;

    constructor(
        userRepository: IUserRepository,
        bcrypt: IHashpassword,
        otpGenerator: IcreateOTP,
        sendMail: ISendMail,
        unverifiedUserRepository: IUnverifiedUserRepository,
        jwtToken: IJwt
    ) {
        this.userRepository = userRepository;
        this.bcrypt = bcrypt;
        this.otpGenerator = otpGenerator;
        this.sendMail = sendMail;
        this.unverifiedUserRepository = unverifiedUserRepository;
        this.jwtToken = jwtToken;
    }

    //register user
    async registerUser(
        newUser: IUser,
        next: Next
    ): Promise<string | void | never> {
        const result = await registerUser(
            this.unverifiedUserRepository,
            this.userRepository,
            this.sendMail,
            this.otpGenerator,
            this.jwtToken,
            this.bcrypt,
            newUser,
            next
        );
        return result;
    }
}
