import UserModel from '../../../database/mongoDB/models/userModel';
import { UserRepository } from '../../../database/mongoDB/repository/UserRepository';
import { UnverifiedUserRepository } from '../../../database/mongoDB/repository/UnverifiedUserRepository';

import { Encrypt } from '../../../services/hashPassword';
import { GenerateOTP } from '../../../services/generateOtp';
import { SendMail } from '../../../services/sendMail';
import { JWTToken } from '../../../services/jwt';

import { UserUseCase } from '../../../../usecaseLayer/useCases/userUseCase';

import { UserController } from '../../../../controller/restController/userController';

import { UserOtpRepository } from '../../../database/mongoDB/repository/UserOtpRepository';
import { FileBucket } from '../../../services/fileBucket';
import { LanguageRepository } from '../../../database/mongoDB/repository/languageRepository';
import LanguageModel from '../../../database/mongoDB/models/languageModel';
import { LanguageUseCase } from '../../../../usecaseLayer/useCases/languageUseCase';
import { ValidateDbObjects } from '../../../services/validateDbObjects';

const userRepository = new UserRepository(UserModel);
const encryptService = new Encrypt();
const generateOTP = new GenerateOTP();
const sendMail = new SendMail();
const unverifiedUserRepository = new UnverifiedUserRepository();
const jwtToken = new JWTToken();
const validateDbObjects= new ValidateDbObjects();
const fileBucket = new FileBucket();

const userOtpRepository = new UserOtpRepository();
const languageRepository= new LanguageRepository(LanguageModel);

const userUseCase = new UserUseCase({
    userRepository,
    bcrypt:encryptService,
    otpGenerator:generateOTP,
    sendMail,
    unverifiedUserRepository,
    jwtToken,
    userOtpRepository,
    fileBucket,
    languageRepository,
    validateDbObjects
});



const languageUseCase = new LanguageUseCase(
    languageRepository,

);

const userController = new UserController({userUseCase,languageUseCase});

export { userController };
