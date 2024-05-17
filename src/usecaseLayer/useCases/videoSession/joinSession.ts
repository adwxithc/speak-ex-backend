import { ISessionRepository } from '../../interface/repository/ISessionRepository';



export const joinSession = async ({
    sessionRepository,
    userId,
    sessionId
}: {
    sessionRepository: ISessionRepository;
    sessionId:string;
    userId: string;
}) => {
    const session = await sessionRepository.findBySessionCode({sessionCode:sessionId});
    if(!session){
        return null;
    }

    if(session.learner) return null;
    await sessionRepository.joinLearner({learner:userId, sessionCode:sessionId});
    return session;
};