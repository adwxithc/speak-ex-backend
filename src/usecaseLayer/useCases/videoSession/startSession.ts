import { ISessionRepository } from '../../interface/repository/ISessionRepository';
import { IGenerateUniQueString } from '../../interface/services/IGenerateUniQueString';


export const startSession = async ({
    sessionRepository,
    userId,
    generateUniqueString
}: {
    sessionRepository: ISessionRepository;
    generateUniqueString:IGenerateUniQueString;
    userId: string;
}) => {
    const sessionCode= generateUniqueString.getString();
    const session =  await sessionRepository.createSession({userId,sessionCode});
    return session;
    
};