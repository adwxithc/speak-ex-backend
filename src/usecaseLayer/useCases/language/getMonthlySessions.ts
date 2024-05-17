
import { ISessionRepository } from '../../interface/repository/ISessionRepository';

export const getMonthlySessions = async ({
    languageId,
    sessionRepository,
}: {
    languageId:string,
    sessionRepository: ISessionRepository;

}) => {

    return await sessionRepository.getMonthlySessions({languageId});
};