import { ISession } from '../../../domain/session';
import { ILnaguageMonthelySessions } from '../usecase/languageUseCase';
import { ISessionDetails } from '../usecase/videoSessionUseCase';

export interface IUsersSesstionData {
    helpingSessions: number;
    learningSessions: number;
    rating: number;
    avgHelpingSessionsPerMonth: number;
    avgLearningSessionsPerMonth: number;
}

export interface ISessionRepository {
    createSession({
        userId,
        sessionCode,
        selectedLearner,
        isMonetized,
    }: {
        userId: string;
        sessionCode: string;
        selectedLearner: string;
        isMonetized: boolean;
    }): Promise<ISession>;
    findBySessionCode({
        sessionCode,
    }: {
        sessionCode: string;
    }): Promise<ISession | null>;
    joinLearner({
        learner,
        sessionCode,
        languageId,
        rate,
    }: {
        learner: string;
        sessionCode: string;
        languageId: string;
        rate: number;
    }): Promise<boolean>;
    findSingleLearner({
        sessionCode,
        liveUsers,
    }: {
        sessionCode: string;
        liveUsers: string[];
    }): Promise<string | null>;
    updateRematchedLearner({
        sessionCode,
        selectedLearner,
    }: {
        sessionCode: string;
        selectedLearner: string;
    }): Promise<ISession>;
    terminateSession({
        sessionCode,
        moneyToTheHelper,
        endingTime,
    }: {
        sessionCode: string;
        moneyToTheHelper:number;
        endingTime: string;
    }): Promise<void>;
    rate({
        sessionCode,
        rating,
    }: {
        sessionCode: string;
        rating: number;
    }): Promise<ISession>;
    getMonthlySessions({
        languageId,
    }: {
        languageId: string;
    }): Promise<ILnaguageMonthelySessions[]>;
    getUsersSesstionData({
        userId,
    }: {
        userId: string;
    }): Promise<IUsersSesstionData>;
    listSessions({
        limit,
        page,
        type,
        userId
    }: {
        limit: number;
        page: number;
        userId:string;
        type: 'helping' | 'learning' | 'all';
    }): Promise<{ sessions: ISessionDetails[]; totalSessions: number }>;
}
