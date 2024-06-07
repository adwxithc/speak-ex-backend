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
import { SessionRepository } from '../../../database/mongoDB/repository/sessionRepository';
import SessionModel from '../../../database/mongoDB/models/SessionModel';
import { WalletRepository } from '../../../database/mongoDB/repository/walletRepository';
import WalletModel from '../../../database/mongoDB/models/WalletModel';
import TransactionModel from '../../../database/mongoDB/models/TransactionModel';
import { GenerateUniQueString } from '../../../services/generateUniqueString';
import { PostRepository } from '../../../database/mongoDB/repository/postRepository';
import PostModel from '../../../database/mongoDB/models/post';
import { ReportRepository } from '../../../database/mongoDB/repository/reportRepository';
import ReportModel from '../../../database/mongoDB/models/ReportModel';
import { NotificationRepository } from '../../../database/mongoDB/repository/NotificationRepository';
import NotificationModel from '../../../database/mongoDB/models/NotificationModel';
import { ImageFormater } from '../../../services/imageFormater';

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
const sessionRepository = new SessionRepository(SessionModel);
const walletRepository = new WalletRepository({walletModel:WalletModel,transactionModel:TransactionModel});
const postRepository= new PostRepository(PostModel);
const reportRepository=new ReportRepository(ReportModel);
const generateUniQueString = new GenerateUniQueString();
const notificationRepository = new NotificationRepository(NotificationModel);
const imageFormater= new ImageFormater();
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
    validateDbObjects,
    walletRepository,
    generateUniQueString,
    postRepository,
    sessionRepository,
    reportRepository,
    notificationRepository,
    imageFormater

});



const languageUseCase = new LanguageUseCase({
    languageRepository,
    sessionRepository

});

const userController = new UserController({userUseCase,languageUseCase});

export { userController };
