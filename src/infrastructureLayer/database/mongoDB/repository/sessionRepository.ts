

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
    getUsersSesstionData
} from './sessionRepository/';

export class SessionRepository implements ISessionRepository {
    constructor(private sessionModel: typeof SessionModel) {}

    async createSession({
        userId,
        sessionCode,
        selectedLearner,
    }: {
        userId: string;
        sessionCode: string;
        selectedLearner: string;
    }) {
        return await createSession({
            userId,
            sessionModel: this.sessionModel,
            sessionCode,
            selectedLearner,
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
        languageId
    }: {
        learner: string;
        sessionCode: string;
        rate:number
        languageId:string
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

    async terminateSession({ sessionCode,endingTime }: { sessionCode: string; endingTime:string }): Promise<void> {
        return await terminateSession({ sessionCode, sessionModel: this.sessionModel,endingTime });
    }

    async rate({ sessionCode, rating }: { sessionCode: string; rating: number; }){
        return await rate({rating,sessionCode,sessionModel:this.sessionModel});
    }
    async getMonthlySessions({ languageId }: { languageId: string; }) {
        return await getMonthlySessions({languageId,sessionModel:this.sessionModel});
    }

    async getUsersSesstionData({ userId }: { userId: string; }) {
        return await getUsersSesstionData({userId, sessionModel:this.sessionModel});
    }
    
}
