
import { IReportRepository } from '../../interface/repository/IReportRepository';
import { IFileBucket } from '../../interface/services/IFileBucket';

export const listReports = async ({
    reportRepository,
    fileBucket,
    page,
    limit,
}: {
    reportRepository: IReportRepository;
    fileBucket:IFileBucket,
    page: number;
    limit: number;
}) => {

    const {reports,totalReports} = await reportRepository.listReportsOnSession({limit,page});
    reports.forEach(r=>{
        r.reportedUserInfo.profile=fileBucket.getFileAccessURL(r.reportedUserInfo.profile);
        r.reports.forEach(item=>{
            item.reporterInfo.profile=fileBucket.getFileAccessURL(item.reporterInfo.profile);
        });
    });

    const lastPage = Math.ceil(totalReports / limit);

    return {reports,totalReports,lastPage};
};