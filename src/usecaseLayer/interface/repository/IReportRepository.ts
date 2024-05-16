import { IReport } from '../../../domain/report';

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
}
