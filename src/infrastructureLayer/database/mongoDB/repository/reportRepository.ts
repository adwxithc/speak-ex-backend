
import { IReportRepository } from '../../../../usecaseLayer/interface/repository/IReportRepository';
import ReportModel from '../models/ReportModel';
import { getReportsOnSession, listReportsOnSession, report } from './reportRepository/';

export class ReportRepository implements IReportRepository {
    constructor(private reportModel: typeof ReportModel) {}

    async report({
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
    }) {
        return await report({
            type,
            referenceId,
            reporter,
            description,
            reportModel: this.reportModel,
            reportedUser,
        });
    }

    async listReportsOnSession({ page, limit }: { page: number; limit: number; }){
        return await listReportsOnSession({page,limit,reportModel:this.reportModel});
    }

    async getReportsOnSession({ userId }: { userId: string; }){
        return await getReportsOnSession({userId,reportModel:this.reportModel});
    }
}
