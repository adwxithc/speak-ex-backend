import { ISessionRepository } from '../interface/repository/ISessionRepository';
import { IUserRepository } from '../interface/repository/IUserRepository';
import { IGenerateUniQueString } from '../interface/services/IGenerateUniQueString';
import { IVideoSessionUseCase } from '../interface/usecase/videoSessionUseCase';
import { startSession, rematch, joinSession } from './videoSession/';


export class VideoSessionUseCase implements IVideoSessionUseCase {
    private readonly generateUniqueString: IGenerateUniQueString;
    private readonly sessionRepository: ISessionRepository;
    private readonly userRepository: IUserRepository;

    constructor({
        generateUniqueString,
        sessionRepository,
        userRepository,
    }: {
        generateUniqueString: IGenerateUniQueString;
        sessionRepository: ISessionRepository;
        userRepository: IUserRepository;
    }) {
        this.sessionRepository = sessionRepository;
        this.userRepository = userRepository;
        this.generateUniqueString = generateUniqueString;
    }

    //startSession
    async startSession({ userId, liveUsers }: { userId: string, liveUsers:string[] }) {
        return await startSession({
            userId,
            liveUsers,
            sessionRepository: this.sessionRepository,
            userRepository: this.userRepository,
            generateUniqueString: this.generateUniqueString,
        });
    }

    async joinSession({userId, sessionId}:{userId: string, sessionId: string}){
        return await joinSession({userId, sessionId, sessionRepository:this.sessionRepository});
    }

    //rematch new user
    async rematch({sessionCode,liveUsers}:{sessionCode:string,liveUsers:string[]}){
        return await rematch({sessionCode, liveUsers, sessionRepository:this.sessionRepository, userRepository:this.userRepository});
    }
}
