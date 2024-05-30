import { BadRequestError } from '../../errors';
import { ISessionRepository } from '../../interface/repository/ISessionRepository';

export const getSessionData = async ({
    userId,
    sessionRepository
}: {
    userId:string,
    sessionRepository:ISessionRepository
}) => {

    const sessionData = await sessionRepository.getUsersSesstionData({userId});
    if(!sessionData) throw new BadRequestError('invalid user');
    return sessionData;
};