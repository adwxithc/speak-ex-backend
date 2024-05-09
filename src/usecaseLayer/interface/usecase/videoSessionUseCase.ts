import { ISession } from '../../../domain/session';

export interface IVideoSessionUseCase{
    startSession({userId}:{userId:string}):Promise<ISession>
}