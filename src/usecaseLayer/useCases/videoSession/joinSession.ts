import { ISessionRepository } from '../../interface/repository/ISessionRepository';
import { IUserRepository } from '../../interface/repository/IUserRepository';



export const joinSession = async ({
    sessionRepository,
    userRepository,
    userId,
    sessionId
}: {
    sessionRepository: ISessionRepository;
    userRepository:IUserRepository;
    sessionId:string;
    userId: string;
}) => {
    const session = await sessionRepository.findBySessionCode({sessionCode:sessionId});
    if(!session){
        return null;
    }
    
    if(session.learner) return null;
    const learner = await userRepository.findUserById(userId);
    if(!learner) return null;
    
    await sessionRepository.joinLearner({learner:userId, sessionCode:sessionId,languageId:learner.focusLanguage as string});
    return session;
};