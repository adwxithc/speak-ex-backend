import { ISessionRepository } from '../interface/repository/ISessionRepository';
import { IUserRepository } from '../interface/repository/IUserRepository';
import { IGenerateUniQueString } from '../interface/services/IGenerateUniQueString';
import { IVideoSessionUseCase } from '../interface/usecase/videoSessionUseCase';
import { startSession } from './videoSession/';
import { joinSession } from './videoSession/joinSession';

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
    async startSession({ userId }: { userId: string }) {
        return await startSession({
            userId,
            sessionRepository: this.sessionRepository,
            userRepository: this.userRepository,
            generateUniqueString: this.generateUniqueString,
        });
    }

    async joinSession({userId, sessionId}:{userId: string, sessionId: string}){
        return await joinSession({userId, sessionId, sessionRepository:this.sessionRepository});
    }
}
