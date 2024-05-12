import { ISession } from '../../../domain/session';



export interface ISessionRepository {
    createSession({ userId, sessionCode }: { userId: string, sessionCode:string }): Promise<ISession>;
    findBySessionCode({sessionCode}:{sessionCode:string}):Promise<ISession | null>;
    joinLearner({learner, sessionCode}:{learner:string, sessionCode:string}):Promise<boolean>;
    
}
