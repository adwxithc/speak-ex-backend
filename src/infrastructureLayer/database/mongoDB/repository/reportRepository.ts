import { IReportRepository } from '../../../../usecaseLayer/interface/repository/IReportRepository';
import ReportModel from '../models/ReportModel';
import { report } from './reportRepository/';

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
}
