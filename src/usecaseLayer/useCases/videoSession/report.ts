import { BadRequestError } from '../../errors';
import { IReportRepository } from '../../interface/repository/IReportRepository';
import { ISessionRepository } from '../../interface/repository/ISessionRepository';

export const report = async ({
    sessionCode,
    description,
    reporter,
    sessionRepository,
    reportRepository,
}: {
    sessionCode: string;
    description: string;
    reporter: string;
    sessionRepository: ISessionRepository;
    reportRepository: IReportRepository;
}) => {
    const session = await sessionRepository.findBySessionCode({ sessionCode });
    if(!session || session.learner?.toString()!==reporter){
        throw new BadRequestError('invalid session');
    }

    const report =await  reportRepository.report({description,referenceId:session.id||'',reportedUser:session.helper.toString(),reporter,type:'sessions'});
    return report;

};
