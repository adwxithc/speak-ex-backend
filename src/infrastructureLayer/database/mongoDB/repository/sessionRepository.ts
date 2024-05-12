
import { ISessionRepository } from '../../../../usecaseLayer/interface/repository/ISessionRepository';
import SessionModel from '../models/SessionModel';
import { createSession, findBySessionCode, joinLearner } from './sessionRepository/';

export class SessionRepository implements ISessionRepository {
    constructor(private sessionModel: typeof SessionModel) {}

    async createSession({
        userId,
        sessionCode,
    }: {
        userId: string;
        sessionCode: string;
    }) {
        return await createSession({
            userId,
            sessionModel: this.sessionModel,
            sessionCode,
        });
    }

    async findBySessionCode({
        sessionCode,
    }: {
        sessionCode: string;
    }){
        return await findBySessionCode({
            sessionCode,
            sessionModel: this.sessionModel,
        }) ;
    }

    async joinLearner({ learner,sessionCode }: { learner: string; sessionCode:string }) {
        return await joinLearner({
            learner,
            sessionCode,
            sessionModel:this.sessionModel
        });
    }
}
