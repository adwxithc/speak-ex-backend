import { ISession } from '../../../domain/session';
import { ILnaguageMonthelySessions } from '../usecase/languageUseCase';



export interface ISessionRepository {
    createSession({ userId, sessionCode, selectedLearner }: { userId: string, sessionCode:string, selectedLearner:string }): Promise<ISession>;
    findBySessionCode({sessionCode}:{sessionCode:string}):Promise<ISession | null>;
    joinLearner({learner, sessionCode,languageId,rate}:{learner:string, sessionCode:string,languageId:string,rate:number}):Promise<boolean>;
    findSingleLearner({ sessionCode, liveUsers}:{ sessionCode: string, liveUsers: string[]}):Promise<string|null>
    updateRematchedLearner({sessionCode, selectedLearner}:{sessionCode:string, selectedLearner:string}):Promise<ISession>
    terminateSession({sessionCode,endingTime}:{sessionCode:string,endingTime:string}):Promise<void>
    rate({sessionCode,rating}:{sessionCode:string,rating:number}):Promise<ISession>
    getMonthlySessions({languageId}:{languageId:string}):Promise<ILnaguageMonthelySessions[]>
}
