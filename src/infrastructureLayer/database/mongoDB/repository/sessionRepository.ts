import { ISessionRepository } from '../../../../usecaseLayer/interface/repository/ISessionRepository';
import SessionModel from '../models/SessionModel';
import {
    createSession,
    findBySessionCode,
    joinLearner,
    findSingleLearner,
    updateRematchedLearner,
    terminateSession,
    rate,
    getMonthlySessions,
    getUsersSesstionData,
    listSessions,
} from './sessionRepository/';

export class SessionRepository implements ISessionRepository {
    constructor(private sessionModel: typeof SessionModel) {}

    async createSession({
        userId,
        sessionCode,
        selectedLearner,
        isMonetized,
    }: {
        userId: string;
        sessionCode: string;
        selectedLearner: string;
        isMonetized: boolean;
    }) {
        return await createSession({
            userId,
            sessionModel: this.sessionModel,
            sessionCode,
            selectedLearner,
            isMonetized,
        });
    }

    async findBySessionCode({ sessionCode }: { sessionCode: string }) {
        return await findBySessionCode({
            sessionCode,
            sessionModel: this.sessionModel,
        });
    }

    async joinLearner({
        learner,
        sessionCode,
        rate,
        languageId,
    }: {
        learner: string;
        sessionCode: string;
        rate: number;
        languageId: string;
    }) {
        return await joinLearner({
            learner,
            sessionCode,
            rate,
            languageId,
            sessionModel: this.sessionModel,
        });
    }

    async findSingleLearner({
        sessionCode,
        liveUsers,
    }: {
        sessionCode: string;
        liveUsers: string[];
    }) {
        return await findSingleLearner({
            liveUsers,
            sessionCode,
            sessionModel: this.sessionModel,
        });
    }

    async updateRematchedLearner({
        sessionCode,
        selectedLearner,
    }: {
        sessionCode: string;
        selectedLearner: string;
    }) {
        return await updateRematchedLearner({
            sessionCode,
            selectedLearner,
            sessionModel: this.sessionModel,
        });
    }

    async terminateSession({
        sessionCode,
        moneyToTheHelper,
        endingTime,
    }: {
        sessionCode: string;
        moneyToTheHelper:number
        endingTime: string;
    }): Promise<void> {
        return await terminateSession({
            sessionCode,
            sessionModel: this.sessionModel,
            endingTime,
            moneyToTheHelper
        });
    }

    async rate({
        sessionCode,
        rating,
    }: {
        sessionCode: string;
        rating: number;
    }) {
        return await rate({
            rating,
            sessionCode,
            sessionModel: this.sessionModel,
        });
    }
    async getMonthlySessions({ languageId }: { languageId: string }) {
        return await getMonthlySessions({
            languageId,
            sessionModel: this.sessionModel,
        });
    }

    async getUsersSesstionData({ userId }: { userId: string }) {
        return await getUsersSesstionData({
            userId,
            sessionModel: this.sessionModel,
        });
    }

    async listSessions({
        limit,
        page,
        type,
        userId,
    }: {
        limit: number;
        page: number;
        type: 'helping' | 'learning' | 'all';
        userId: string;
    }) {
        return await listSessions({
            limit,
            page,
            type,
            sessionModel: this.sessionModel,
            userId,
        });
    }
}
