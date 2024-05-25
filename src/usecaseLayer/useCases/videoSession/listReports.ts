
import { IReportRepository } from '../../interface/repository/IReportRepository';

export const listReports = async ({
    reportRepository,
    page,
    limit,
}: {
    reportRepository: IReportRepository;
    page: number;
    limit: number;
}) => {

    const {reports,totalReports} = await reportRepository.listReportsOnSession({limit,page});


    const lastPage = Math.ceil(totalReports / limit);

    return {reports,totalReports,lastPage};
};