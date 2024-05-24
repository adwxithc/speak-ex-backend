
import { IReportRepository } from '../interface/repository/IReportRepository';
import { ISessionRepository } from '../interface/repository/ISessionRepository';
import { IUserRepository } from '../interface/repository/IUserRepository';
import { IWalletRepository } from '../interface/repository/IWalletRepository';
import { IGenerateUniQueString } from '../interface/services/IGenerateUniQueString';
import { IVideoSessionUseCase } from '../interface/usecase/videoSessionUseCase';
import { startSession, rematch, joinSession, terminateSession, rate, report } from './videoSession/';

export class VideoSessionUseCase implements IVideoSessionUseCase {
    private readonly generateUniqueString: IGenerateUniQueString;
    private readonly sessionRepository: ISessionRepository;
    private readonly userRepository: IUserRepository;
    private readonly reportRepository: IReportRepository;
    private readonly walletRepository: IWalletRepository;

    constructor({
        generateUniqueString,
        sessionRepository,
        userRepository,
        reportRepository,
        walletRepository
    }: {
        generateUniqueString: IGenerateUniQueString;
        sessionRepository: ISessionRepository;
        userRepository: IUserRepository;
        reportRepository:IReportRepository;
        walletRepository:IWalletRepository
    }) {
        this.sessionRepository = sessionRepository;
        this.userRepository = userRepository;
        this.generateUniqueString = generateUniqueString;
        this.reportRepository=reportRepository;
        this.walletRepository = walletRepository;
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
            userRepository:this.userRepository
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

    async terminateSession({ sessionCode }: { sessionCode: string; }) {
        return await terminateSession({sessionCode,sessionRepository:this.sessionRepository,generateUniqueString:this.generateUniqueString,walletRepository:this.walletRepository});
    }

    async rate({ sessionCode, userId, rating }: { sessionCode: string; userId: string; rating: number; }) {
        return await rate({ sessionCode, userId, rating, sessionRepository:this.sessionRepository });
    }

    async report({ sessionCode, description, reporter }: { sessionCode: string; description: string; reporter: string; }){
        return await report({ sessionCode, description, reporter,sessionRepository:this.sessionRepository,reportRepository:this.reportRepository });
    }

    
}
