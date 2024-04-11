import UserModel from '../../../database/mongoDB/models/userModel';
import { UserRepository } from '../../../database/mongoDB/repository/UserRepository';
import { UnverifiedUserRepository } from '../../../database/mongoDB/repository/UnverifiedUserRepository';

import { Encrypt } from '../../../services/hashPassword';
import { GenerateOTP } from '../../../services/generateOtp';
import { SendMail } from '../../../services/sendMail';
import { JWTToken } from '../../../services/jwt';

import { UserUseCase } from '../../../../usecaseLayer/useCases/userUseCase';

import { UserController } from '../../../../controller/userAdapter';

import { UserOtpRepository } from '../../../database/mongoDB/repository/UserOtpRepository';

const userRepository = new UserRepository(UserModel);
const encryptService = new Encrypt();
const generateOTP = new GenerateOTP();
const sendMail = new SendMail();
const unverifiedUserRepository = new UnverifiedUserRepository();
const jwtToken = new JWTToken();

const userOtpRepository = new UserOtpRepository();

const userUseCase = new UserUseCase(
    userRepository,
    encryptService,
    generateOTP,
    sendMail,
    unverifiedUserRepository,
    jwtToken,
    userOtpRepository
);

const userController = new UserController(userUseCase);

export { userController };
