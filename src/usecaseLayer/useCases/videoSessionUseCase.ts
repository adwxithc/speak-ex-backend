import { IMonetizationRequestStatus } from '../../domain/monetizationRequest';
import { ICoinPurchasePlanRepository } from '../interface/repository/ICoinPurchasePlanRepository';
import { ICoinPurchaseRepository } from '../interface/repository/ICoinPurchaseRepository';
import { IMonetizationRequestRepository } from '../interface/repository/IMonetizationRequestRepository';
import { INotificationRepository } from '../interface/repository/INotification';
import { IReportRepository } from '../interface/repository/IReportRepository';
import { ISessionRepository } from '../interface/repository/ISessionRepository';
import { ISocketRepository } from '../interface/repository/ISocketRepository';
import { IUserRepository } from '../interface/repository/IUserRepository';
import { IWalletRepository } from '../interface/repository/IWalletRepository';
import { IFileBucket } from '../interface/services/IFileBucket';
import { IGenerateUniQueString } from '../interface/services/IGenerateUniQueString';
import { IImageFormater } from '../interface/services/IImageFormater';
import { IPaymentService } from '../interface/services/IPaymentService';
import { ISocketService } from '../interface/services/ISocketService';
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
    deletePurchasePlan,
    createPayment,
    paymentConfirmation,
    getSessionData,
    requestMonetization,
    listMonetizationRequests,
    updateMonetizationStatus,
    getVideoSessions,
    getTransactions,
} from './videoSession/';

export class VideoSessionUseCase implements IVideoSessionUseCase {
    private readonly generateUniqueString: IGenerateUniQueString;
    private readonly sessionRepository: ISessionRepository;
    private readonly userRepository: IUserRepository;
    private readonly reportRepository: IReportRepository;
    private readonly walletRepository: IWalletRepository;
    private readonly fileBucket: IFileBucket;
    private readonly coinPurchasePlanRepository: ICoinPurchasePlanRepository;
    private readonly imageFormater: IImageFormater;
    private readonly paymentService: IPaymentService;
    private readonly coinPurchaseRepository: ICoinPurchaseRepository;
    private readonly monetizationRequestRepository: IMonetizationRequestRepository;
    private readonly notificationRepository: INotificationRepository;
    private readonly socketRepository: ISocketRepository;
    private readonly socketService: ISocketService;

    constructor({
        generateUniqueString,
        sessionRepository,
        userRepository,
        reportRepository,
        walletRepository,
        coinPurchasePlanRepository,
        fileBucket,
        imageFormater,
        paymentService,
        coinPurchaseRepository,
        monetizationRequestRepository,
        socketService,
        socketRepository,
        notificationRepository,
    }: {
        generateUniqueString: IGenerateUniQueString;
        sessionRepository: ISessionRepository;
        userRepository: IUserRepository;
        reportRepository: IReportRepository;
        walletRepository: IWalletRepository;
        coinPurchasePlanRepository: ICoinPurchasePlanRepository;
        fileBucket: IFileBucket;
        imageFormater: IImageFormater;
        paymentService: IPaymentService;
        coinPurchaseRepository: ICoinPurchaseRepository;
        monetizationRequestRepository: IMonetizationRequestRepository;
        socketService: ISocketService;
        socketRepository: ISocketRepository;
        notificationRepository: INotificationRepository;
    }) {
        this.sessionRepository = sessionRepository;
        this.userRepository = userRepository;
        this.generateUniqueString = generateUniqueString;
        this.reportRepository = reportRepository;
        this.walletRepository = walletRepository;
        this.fileBucket = fileBucket;
        this.coinPurchasePlanRepository = coinPurchasePlanRepository;
        this.imageFormater = imageFormater;
        this.paymentService = paymentService;
        this.coinPurchaseRepository = coinPurchaseRepository;
        this.monetizationRequestRepository = monetizationRequestRepository;
        this.socketService = socketService;
        this.socketRepository = socketRepository;
        this.notificationRepository = notificationRepository;
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
            coinPurchasePlanRepository: this.coinPurchasePlanRepository,
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
            imageFormater: this.imageFormater,
            coinPurchasePlanRepository: this.coinPurchasePlanRepository,
        });
    }

    async getPurchasePlans() {
        return await getPurchasePlans({
            coinPurchasePlanRepository: this.coinPurchasePlanRepository,
            fileBucket: this.fileBucket,
        });
    }
    async deletePurchasePlan(id: string) {
        return await deletePurchasePlan({
            id,
            coinPurchasePlanRepository: this.coinPurchasePlanRepository,
        });
    }

    async createPayment({
        userId,
        coinPurchasePlanId,
    }: {
        userId: string;
        coinPurchasePlanId: string;
    }) {
        return await createPayment({
            userId,
            coinPurchasePlanId,
            paymentService: this.paymentService,
            coinPurchasePlanRepository: this.coinPurchasePlanRepository,
            fileBucket: this.fileBucket,
        });
    }

    async paymentConfirmation({
        signature,
        payload,
    }: {
        signature: string;
        payload: Buffer;
    }) {
        await paymentConfirmation({
            signature,
            payload,
            walletRepository: this.walletRepository,
            coinPurchaseRepository: this.coinPurchaseRepository,
            paymentService: this.paymentService,
        });
    }

    async getSessionData(userId: string) {
        return await getSessionData({
            userId,
            sessionRepository: this.sessionRepository,
            userRepository: this.userRepository,
        });
    }
    async requestMonetization({
        userId,
        description,
    }: {
        userId: string;
        description: string;
    }) {
        return await requestMonetization({
            userId,
            description,
            monetizationRequestRepository: this.monetizationRequestRepository,
            userRepository: this.userRepository,
        });
    }

    async listMonetizationRequests({
        page,
        limit,
        status,
    }: {
        page: number;
        limit: number;
        status: string;
    }) {
        return await listMonetizationRequests({
            page,
            limit,
            status,
            monetizationRequestRepository: this.monetizationRequestRepository,
            fileBucket: this.fileBucket,
        });
    }
    async updateMonetizationStatus({
        userId,
        status,
    }: {
        userId: string;
        status: IMonetizationRequestStatus;
    }) {
        return await updateMonetizationStatus({
            userId,
            status,
            userRepository: this.userRepository,
            monetizationRequestRepository: this.monetizationRequestRepository,
            notificationRepository: this.notificationRepository,
            socketRepository: this.socketRepository,
            socketService: this.socketService,
        });
    }

    async getVideoSessions({
        userId,
        page,
        limit,
        type,
    }: {
        userId: string;
        page: number;
        limit: number;
        type: string;
    }) {
        return await getVideoSessions({
            page,
            limit,
            userId,
            type,
            sessionRepository: this.sessionRepository,
            fileBucket: this.fileBucket,
        });
    }

    async getTransactions({
        userId,
        page,
        limit,
        type,
    }: {
        userId: string;
        page: number;
        limit: number;
        type: string;
    }) {
        return await getTransactions({
            userId,
            page,
            limit,
            type,
            walletRepository: this.walletRepository,
        });
    }
}
