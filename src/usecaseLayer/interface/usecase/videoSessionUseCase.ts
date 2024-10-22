import ICoinPurchasePlan from '../../../domain/coinPurchasePlan';
import IMonetizationRequest, {
    IMonetizationRequestStatus,
} from '../../../domain/monetizationRequest';
import { IReport } from '../../../domain/report';
import { ISession } from '../../../domain/session';
import ITransaction from '../../../domain/transaction';
import IUser from '../../../domain/user';
import { IUsersSesstionData } from '../repository/ISessionRepository';

export interface IReportWithUsers {
    reports: (IReport & {
        reporterInfo: {
            id: string;
            username: string;
            firstName: string;
            lastName: string;
            profile: string;
        };
    })[];
    reportedUserInfo: {
        id: string;
        username: string;
        firstName: string;
        lastName: string;
        profile: string;
    };
}

export interface IMonetizationRequestData extends IMonetizationRequest {
    userData: {
        id: string;
        firstName: string;
        lastName: string;
        userName: string;
        profile: string;
    };
}

export interface ISessionDetails extends ISession {
    helperData: {firstName:string;lastName:string;userName:string;profile:string ; id:string};
    learnerData: {firstName:string;lastName:string;userName:string;profile:string ; id:string};
}

export interface IVideoSessionUseCase {
    startSession({
        userId,
        liveUsers,
    }: {
        userId: string;
        liveUsers: string[];
    }): Promise<{ success: boolean; data?: ISession; message: string }>;
    rematch({
        sessionCode,
        liveUsers,
    }: {
        sessionCode: string;
        liveUsers: string[];
    }): Promise<{ success: boolean; message: string; data?: string }>;

    joinSession({
        userId,
        sessionId,
    }: {
        userId: string;
        sessionId: string;
    }): Promise<{ success: boolean; message: string; data?: ISession }>;

    terminateSession({
        sessionCode,
        endingTime,
    }: {
        sessionCode: string;
        endingTime: string;
    }): Promise<{ success: boolean; message: string; data?: number }>;

    rate({
        sessionCode,
        userId,
        rating,
    }: {
        sessionCode: string;
        userId: string;
        rating: number;
    }): Promise<ISession>;
    report({
        sessionCode,
        description,
        reporter,
    }: {
        sessionCode: string;
        description: string;
        reporter: string;
    }): Promise<IReport>;
    getSession({
        sessionCode,
    }: {
        sessionCode: string;
    }): Promise<ISession | null>;
    listReports({ page, limit }: { page: number; limit: number }): Promise<{
        reports: IReportWithUsers[];
        totalReports: number;
        lastPage: number;
    }>;
    createCoinPurchasePlan({
        count,
        title,
        imageFile,
        price,
    }: {
        count: number;
        title: string;
        imageFile: Express.Multer.File | undefined;
        price: number;
    }): Promise<ICoinPurchasePlan>;
    getPurchasePlans(): Promise<ICoinPurchasePlan[]>;
    deletePurchasePlan(id: string): Promise<ICoinPurchasePlan>;
    createPayment({
        userId,
        coinPurchasePlanId,
    }: {
        userId: string;
        coinPurchasePlanId: string;
    }): Promise<string>;
    paymentConfirmation({
        signature,
        payload,
    }: {
        signature: string;
        payload: Buffer;
    }): Promise<void>;

    getSessionData(
        userId: string
    ): Promise<IUsersSesstionData & { isMonetized: boolean }>;

    requestMonetization({
        userId,
        description,
    }: {
        userId: string;
        description: string;
    }): Promise<IMonetizationRequest>;

    listMonetizationRequests({
        page,
        limit,
        status,
    }: {
        page: number;
        limit: number;
        status: string;
    }): Promise<{
        requests: IMonetizationRequestData[];
        totalRequests: number;
        lastPage: number;
    }>;

    updateMonetizationStatus({
        userId,
        status,
    }: {
        userId: string;
        status: IMonetizationRequestStatus;
    }): Promise<IUser>;

    getVideoSessions({
        userId,
        page,
        limit,
        type,
    }: {
        userId: string;
        page: number;
        limit: number;
        type: string;
    }): Promise<{
        sessions: ISessionDetails[];
        totalSessions: number;
        lastPage: number;
    }>;

    getTransactions({
        userId,
        page,
        limit,
        type,
    }: {
        userId: string;
        page: number;
        limit: number;
        type: string;
    }): Promise<{
        transactions: ITransaction[];
        totalTransactions: number;
        lastPage: number;
    }>;
}
