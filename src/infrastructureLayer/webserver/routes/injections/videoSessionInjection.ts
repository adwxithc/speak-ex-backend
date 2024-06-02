
import { VideoSessionController } from '../../../../controller/restController/sessionController';
import { VideoSessionUseCase } from '../../../../usecaseLayer/useCases/videoSessionUseCase';
import CoinPurchaseModel from '../../../database/mongoDB/models/CoinPurchaseModal';
import CoinPurchasePlanModel from '../../../database/mongoDB/models/CoinPurchasePlan';
import ReportModel from '../../../database/mongoDB/models/ReportModel';
import SessionModel from '../../../database/mongoDB/models/SessionModel';
import TransactionModel from '../../../database/mongoDB/models/TransactionModel';
import WalletModel from '../../../database/mongoDB/models/WalletModel';
import MonetizationRequestModel from '../../../database/mongoDB/models/monetizationRequest';
import UserModel from '../../../database/mongoDB/models/userModel';
import { CoinPurchasePlanRepository } from '../../../database/mongoDB/repository/CoinPurchasePlanRepository';
import { UserRepository } from '../../../database/mongoDB/repository/UserRepository';
import { CoinPurchaseRepository } from '../../../database/mongoDB/repository/coinPurchaseRepository';
import { MonetizationRequestRepository } from '../../../database/mongoDB/repository/monetizationRequestRepository';
import { ReportRepository } from '../../../database/mongoDB/repository/reportRepository';
import { SessionRepository } from '../../../database/mongoDB/repository/sessionRepository';
import { WalletRepository } from '../../../database/mongoDB/repository/walletRepository';
import { FileBucket } from '../../../services/fileBucket';
import { GenerateUniQueString } from '../../../services/generateUniqueString';
import { ImageFormater } from '../../../services/imageFormater';
import { PaymentService } from '../../../services/paymentService';

const generateUniqueString = new GenerateUniQueString();
const imageFormater= new ImageFormater();
const paymentService = new PaymentService();

const sessionRepository = new SessionRepository(SessionModel);
const userRepository = new UserRepository(UserModel);
const reportRepository = new ReportRepository(ReportModel);
const coinPurchaseRepository= new CoinPurchaseRepository(CoinPurchaseModel);
const monetizationRequestRepository= new MonetizationRequestRepository(MonetizationRequestModel);
const fileBucket = new FileBucket();

const walletRepository = new WalletRepository({
    walletModel: WalletModel,
    transactionModel: TransactionModel,
});
const coinPurchasePlanRepository = new CoinPurchasePlanRepository(CoinPurchasePlanModel);

export const videoSessionUseCase = new VideoSessionUseCase({
    generateUniqueString,
    sessionRepository,
    userRepository,
    reportRepository,
    walletRepository,
    fileBucket,
    coinPurchasePlanRepository,
    imageFormater,
    paymentService,
    coinPurchaseRepository,
    monetizationRequestRepository

});

const videoSessionController = new VideoSessionController(videoSessionUseCase);

export { videoSessionController };
