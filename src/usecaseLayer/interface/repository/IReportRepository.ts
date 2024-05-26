import { IReport } from '../../../domain/report';
import { IReportWithUsers } from '../usecase/videoSessionUseCase';

export interface IReportDetailsOnSession extends IReport{
    reporterDetails:{firstName:string,lastName:string,userName:string,profile:string}
}

export interface IReportRepository {
    report({
        type,
        referenceId,
        reporter,
        description,
        reportedUser,
    }: {
        type: 'sessions' | 'posts';
        referenceId: string;
        reporter: string;
        description: string;
        reportedUser: string;
    }): Promise<IReport>;
    listReportsOnSession({page,limit}:{page:number,limit:number}):Promise<{reports: IReportWithUsers[];totalReports: number;}>;
    getReportsOnSession({userId}:{userId:string}):Promise<IReportDetailsOnSession[]>
}

