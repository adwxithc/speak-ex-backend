import { IReport } from '../../../domain/report';
import { ISession } from '../../../domain/session';

export interface IVideoSessionUseCase {
    startSession({
        userId,
        liveUsers,
    }: {
        userId: string;
        liveUsers: string[];
    }): Promise<{success:boolean,data?:ISession,message:string}>;
    rematch({
        sessionCode,
        liveUsers,
    }: {
        sessionCode: string;
        liveUsers: string[];
    }): Promise<{success:boolean,message:string,data?:string}>;

    joinSession({ userId,sessionId}:{ userId:string,sessionId:string}):Promise<{success:boolean,message:string,data?:ISession}>

    terminateSession({sessionCode}:{sessionCode:string}):Promise<void>

    rate({sessionCode,userId,rating}:{sessionCode:string,userId:string,rating:number}):Promise<ISession>;
    report({sessionCode,description,reporter}:{sessionCode:string,description:string,reporter:string}):Promise<IReport>;
}
