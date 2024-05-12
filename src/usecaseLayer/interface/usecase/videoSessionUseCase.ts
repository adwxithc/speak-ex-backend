import { ISession } from '../../../domain/session';


export interface IVideoSessionUseCase{
    startSession({userId}:{userId:string}):Promise<{session:ISession, learners:{id:string}[]}>
}