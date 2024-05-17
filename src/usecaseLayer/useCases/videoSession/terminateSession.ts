import { ISessionRepository } from '../../interface/repository/ISessionRepository';

export const terminateSession = async ({
    sessionRepository,
    sessionCode,

}: {
    sessionRepository: ISessionRepository;
  
    sessionCode: string;

}) => {
    
    const session = await sessionRepository.findBySessionCode({sessionCode});
    console.log('session termination process----',session,sessionCode);
    if(!session || !session?.helper || !session.learner || session.endingTime){
        return;
    }
    await sessionRepository.terminateSession({sessionCode});
};
