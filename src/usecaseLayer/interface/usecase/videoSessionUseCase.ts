import { IReport } from '../../../domain/report';
import { ISession } from '../../../domain/session';

export interface IReportWithUsers{
    reports:(IReport&{reporterInfo:{
        id: string;
        username: string;
        firstName:string;
        lastName:string;
        profile:string;

    }})[],
    reportedUserInfo:{
        id: string;
        username: string;
        firstName:string;
        lastName:string;
        profile:string
    },
}

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

    terminateSession({sessionCode,endingTime}:{sessionCode:string,endingTime:string}):Promise<{success:boolean,message:string,data?:number}>

    rate({sessionCode,userId,rating}:{sessionCode:string,userId:string,rating:number}):Promise<ISession>;
    report({sessionCode,description,reporter}:{sessionCode:string,description:string,reporter:string}):Promise<IReport>;
    getSession({sessionCode}:{sessionCode:string}):Promise<ISession|null>
    listReports({page,limit}:{page:number,limit:number}):Promise<{ reports: IReportWithUsers[]; totalReports: number; lastPage: number }>
}
