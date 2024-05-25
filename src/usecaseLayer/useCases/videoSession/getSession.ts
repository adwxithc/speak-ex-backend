import { ISessionRepository } from '../../interface/repository/ISessionRepository';

export const getSession = async ({
    sessionCode,
    sessionRepository,
}: {
    sessionCode: string;
    sessionRepository: ISessionRepository;
}) => {
    return await sessionRepository.findBySessionCode({ sessionCode });
};
