import ICoinPurchasePlan from '../../domain/coinPurchasePlan';
import { ICoinPurchasePlanRepository } from '../interface/repository/ICoinPurchasePlanRepository';
import { IReportRepository } from '../interface/repository/IReportRepository';
import { ISessionRepository } from '../interface/repository/ISessionRepository';
import { IUserRepository } from '../interface/repository/IUserRepository';
import { IWalletRepository } from '../interface/repository/IWalletRepository';
import { IFileBucket } from '../interface/services/IFileBucket';
import { IGenerateUniQueString } from '../interface/services/IGenerateUniQueString';
import { IImageCroper } from '../interface/services/IIMageCroper';
import { IVideoSessionUseCase } from '../interface/usecase/videoSessionUseCase';
import {
    startSession,
    rematch,
    joinSession,
    terminateSession,
    rate,
    report,
    getSession,
    listReports,
    createCoinPurchasePlan,
    getPurchasePlans,
} from './videoSession/';

export class VideoSessionUseCase implements IVideoSessionUseCase {
    private readonly generateUniqueString: IGenerateUniQueString;
    private readonly sessionRepository: ISessionRepository;
    private readonly userRepository: IUserRepository;
    private readonly reportRepository: IReportRepository;
    private readonly walletRepository: IWalletRepository;
    private readonly fileBucket: IFileBucket;
    private readonly coinPurchasePlanRepository: ICoinPurchasePlanRepository;
    private readonly imageCroper: IImageCroper;
    constructor({
        generateUniqueString,
        sessionRepository,
        userRepository,
        reportRepository,
        walletRepository,
        coinPurchasePlanRepository,
        fileBucket,
        imageCroper
    }: {
        generateUniqueString: IGenerateUniQueString;
        sessionRepository: ISessionRepository;
        userRepository: IUserRepository;
        reportRepository: IReportRepository;
        walletRepository: IWalletRepository;
        coinPurchasePlanRepository: ICoinPurchasePlanRepository;
        fileBucket: IFileBucket;
        imageCroper: IImageCroper;
    }) {
        this.sessionRepository = sessionRepository;
        this.userRepository = userRepository;
        this.generateUniqueString = generateUniqueString;
        this.reportRepository = reportRepository;
        this.walletRepository = walletRepository;
        this.fileBucket = fileBucket;
        this.coinPurchasePlanRepository = coinPurchasePlanRepository;
        this.imageCroper=imageCroper;
    }

    //startSession
    async startSession({
        userId,
        liveUsers,
    }: {
        userId: string;
        liveUsers: string[];
    }) {
        return await startSession({
            userId,
            liveUsers,
            sessionRepository: this.sessionRepository,
            userRepository: this.userRepository,
            generateUniqueString: this.generateUniqueString,
        });
    }

    async joinSession({
        userId,
        sessionId,
    }: {
        userId: string;
        sessionId: string;
    }) {
        return await joinSession({
            userId,
            sessionId,
            sessionRepository: this.sessionRepository,
            userRepository: this.userRepository,
        });
    }

    //rematch new user
    async rematch({
        sessionCode,
        liveUsers,
    }: {
        sessionCode: string;
        liveUsers: string[];
    }) {
        return await rematch({
            sessionCode,
            liveUsers,
            sessionRepository: this.sessionRepository,
        });
    }

    async terminateSession({
        sessionCode,
        endingTime,
    }: {
        sessionCode: string;
        endingTime: string;
    }) {
        return await terminateSession({
            sessionCode,
            endingTime,
            sessionRepository: this.sessionRepository,
            generateUniqueString: this.generateUniqueString,
            walletRepository: this.walletRepository,
        });
    }

    async rate({
        sessionCode,
        userId,
        rating,
    }: {
        sessionCode: string;
        userId: string;
        rating: number;
    }) {
        return await rate({
            sessionCode,
            userId,
            rating,
            sessionRepository: this.sessionRepository,
        });
    }

    async report({
        sessionCode,
        description,
        reporter,
    }: {
        sessionCode: string;
        description: string;
        reporter: string;
    }) {
        return await report({
            sessionCode,
            description,
            reporter,
            sessionRepository: this.sessionRepository,
            reportRepository: this.reportRepository,
        });
    }

    async getSession({ sessionCode }: { sessionCode: string }) {
        return await getSession({
            sessionCode,
            sessionRepository: this.sessionRepository,
        });
    }

    async listReports({ page, limit }: { page: number; limit: number }) {
        return await listReports({
            reportRepository: this.reportRepository,
            fileBucket: this.fileBucket,
            page,
            limit,
        });
    }

    async createCoinPurchasePlan({
        count,
        title,
        imageFile,
        price,
    }: {
        count: number;
        title: string;
        imageFile: Express.Multer.File | undefined;
        price: number;
    }) {
        return await createCoinPurchasePlan({
            count,
            title,
            fileBucket: this.fileBucket,
            imageFile,
            price,
            imageCroper:this.imageCroper,
            coinPurchasePlanRepository: this.coinPurchasePlanRepository,
        });
    }

    async getPurchasePlans(): Promise<ICoinPurchasePlan[]> {
        return await getPurchasePlans({
          
            coinPurchasePlanRepository: this.coinPurchasePlanRepository,
            fileBucket:this.fileBucket
        });
    }
}
