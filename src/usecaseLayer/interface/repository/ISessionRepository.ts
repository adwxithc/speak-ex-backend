import { ISession } from '../../../domain/session';



export interface ISessionRepository {
    createSession({ userId, sessionCode, selectedLearner }: { userId: string, sessionCode:string, selectedLearner:string }): Promise<ISession>;
    findBySessionCode({sessionCode}:{sessionCode:string}):Promise<ISession | null>;
    joinLearner({learner, sessionCode}:{learner:string, sessionCode:string}):Promise<boolean>;
    findSingleLearner({ sessionCode, liveUsers}:{ sessionCode: string, liveUsers: string[]}):Promise<string|null>
    updateRematchedLearner({sessionCode, selectedLearner}:{sessionCode:string, selectedLearner:string}):Promise<ISession>
}
