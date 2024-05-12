import { ISessionRepository } from '../../interface/repository/ISessionRepository';
import { IUserRepository } from '../../interface/repository/IUserRepository';
import { IGenerateUniQueString } from '../../interface/services/IGenerateUniQueString';


export const startSession = async ({
    sessionRepository,
    userRepository,
    userId,
    generateUniqueString
}: {
    sessionRepository: ISessionRepository;
    userRepository:IUserRepository
    generateUniqueString:IGenerateUniQueString;
    userId: string;
}) => {
    const sessionCode= generateUniqueString.getString();
    const session =  await sessionRepository.createSession({userId,sessionCode});
    const learners =await userRepository.getLearners({helperId:userId});
    
    return {session,learners};
};