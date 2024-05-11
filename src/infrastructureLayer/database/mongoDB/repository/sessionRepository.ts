import { ISessionRepository } from '../../../../usecaseLayer/interface/repository/ISessionRepository';
import SessionModel from '../models/SessionModel';
import { createSession } from './sessionRepository/';



export class SessionRepository implements ISessionRepository {
    
    constructor(private sessionModel: typeof SessionModel) {}

  

    async createSession({userId, sessionCode}:{userId:string, sessionCode:string}){
        return await createSession({userId,sessionModel:this.sessionModel,sessionCode});
    }

   
}
